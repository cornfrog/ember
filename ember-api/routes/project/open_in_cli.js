import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const open_in_cli = Router();

open_in_cli.post("/", async (request, response) => {
    try {
        const projectId = request.body.projectId;

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        });

        const ember_directories = await prisma.settings.findMany({
            take: 1
        });
        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/open-project ${project.name}`;
        
        await exec_command({
            command: command,
            projects_directory: projects_directory
        });

        return response.json({
            message: success
        });

    } catch (error) {
        return response.json({
            error: error
        })
    }
});

export default open_in_cli;