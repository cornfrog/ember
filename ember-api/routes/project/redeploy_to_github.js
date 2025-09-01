import { Router } from "express";
import exec_command from "../../utils/exec_command.js";
import prisma from "../../lib/prisma.js";

const redeploy_to_github = Router();

redeploy_to_github.post("/", async (request, response) => {
    const projectId = request.body.projectId;
    const profileId = request.body.profileId;
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: profileId
            }
        });

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
        const command = `${scripts_directory}/redeploy-to-github ${project.name}`;
        
        await exec_command({
            command: command,
            projects_directory: projects_directory
        });

        return response.json({
            updatedProject: project
        })
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

export default redeploy_to_github;