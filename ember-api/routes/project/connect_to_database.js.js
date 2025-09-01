import { Router } from "express";
import exec_command from "../../utils/exec_command.js";
import prisma from "../../lib/prisma.js";

const connect_to_database = Router();

connect_to_database.post("/", async (request, response) => {
    const projectId = request.body.projectId;
    const databaseName = request.body.databaseName;
    try {
        const database = await prisma.database.findFirst({
            where: {
                name: databaseName
            }
        });
        const project = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                database: database.name
            }
        });
        const ember_directories = await prisma.settings.findMany({
            take: 1
        });

        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/connect-database ${project.name} ${database.name}`;
        
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

export default connect_to_database;