import { Router } from "express";
import exec_command from "../../utils/exec_command.js";
import prisma from "../../lib/prisma.js";

const view_database = Router();

view_database.post("/", async (request, response) => {
    const projectId = request.body.projectId;
    try {
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
        const command = `${scripts_directory}/view-database ${project.name}`;
        
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

export default view_database;