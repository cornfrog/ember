import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const edit_project = Router();

edit_project.post("/", async (request, response) => {
    try {
        const projectId = request.body.projectId;
        const profileId = request.body.profileId;

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        });

        const profile = await prisma.profile.findUnique({
            where: {
                id: profileId
            }
        });

        const ember_directories = await prisma.settings.findMany({
            take: 1
        });
        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/edit-project ${profile.editor} ${project.name}`;
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

export default edit_project;