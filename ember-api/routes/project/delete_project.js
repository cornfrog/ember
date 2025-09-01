import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const delete_project = Router();

delete_project.post("/", async(request, response) => {
    const project_id = request.body.id;
    try {
        const deleted_project = await prisma.project.delete({
            where: {
                id: project_id
            }
        });
        const ember_directories = await prisma.settings.findMany({
            take: 1
        });
        const projects_directory = ember_directories[0].projectsDir;
        const command = `rm -rf ${deleted_project.name}`;
        await exec_command({
            command: command,
            projects_directory: projects_directory
        });
        const projects = await prisma.project.findMany();
        return response.json({
            projects: projects
        });
    }catch (error) {
        return response.json({
            error: error
        });
    }
});

export default delete_project;