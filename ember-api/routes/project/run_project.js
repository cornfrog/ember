import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const run_project = Router();

run_project.post("/", async (request, response) => {
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
        const command = `${scripts_directory}/run-project ${project.name}`;
        
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

export default run_project;