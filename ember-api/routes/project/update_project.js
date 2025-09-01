import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const update_project = Router();

update_project.post("/", async (request, response) => {
    const project_id = request.body.projectId;
    const project_name = request.body.projectName;

    try {
        const project_to_update = await prisma.project.findUnique({
            where: {
                id: project_id
            }
        });
        const updated_project = await prisma.project.update({
            where: {
                id: project_id
            },
            data: {
                name: project_name
            }
        });
        const ember_directories = await prisma.settings.findMany({
            take: 1
        });
        const projects_directory = ember_directories[0].projectsDir;
        const command = `mv ${project_to_update.name} ${project_name}`;
        await exec_command({
            command: command,
            projects_directory: projects_directory
        });
        const projects = await prisma.project.findMany();
        return response.json({
            updatedProject: updated_project,
            projects: projects
        });
    } catch (error) {
        return response.json({
            error: error
        });
    }
})

export default update_project;