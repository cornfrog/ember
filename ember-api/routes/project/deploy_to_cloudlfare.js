import { Router } from "express";
import exec_command from "../../utils/exec_command.js";
import prisma from "../../lib/prisma.js";

const deploy_to_cloudflare = Router();

deploy_to_cloudflare.post("/", async (request, response) => {
    const projectId = request.body.projectId;
    try {

        const project = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                cloudflareEnabled: true,
            }
        });

        const ember_directories = await prisma.settings.findMany({
            take: 1
        });

        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/upload-project ${project.name}`;

        const commandOutput = await exec_command({
            command: command,
            projects_directory: projects_directory
        });

        const stdout = commandOutput.stdout;
        const match = stdout.match(/https:\/\/(?:[a-z0-9]+\.)?([a-z0-9-]+\.pages\.dev)/);

        const link = match ? `https://${match[1]}` : null;

        await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                cloudflarePage: link
            }

        })

        return response.json({
            updatedProject: project
        })

    } catch (error) {

        return response.json({
            error: error
        });

    }
});

export default deploy_to_cloudflare;