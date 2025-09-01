import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const create_project = Router();

create_project.post("/", async (request, response) => {

    const project_name = request.body.projectName;
    const project_type = request.body.projectType;
    try {
        const created_project = await prisma.project.create({
            data: {
                name: project_name,
                type: project_type
            }
        });
        const ember_directories = await prisma.settings.findMany({
            take: 1
        });
        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/create-app ${project_name} ${project_type === "BACKEND" ? "-backend" : ""}`;
        await exec_command({
            command: command,
            projects_directory: projects_directory
        });
        const projects = await prisma.project.findMany();
        return response.json({
            createdProject: created_project,
            projects: projects
        });
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

export default create_project;