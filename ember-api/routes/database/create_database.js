import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const create_database = Router();

create_database.post("/", async (request, response) => {
    const database_name = request.body.databaseName;
    try {
        const created_database = await prisma.database.create({
            data:{
                name: database_name
            }
        });
        const ember_directories = await prisma.settings.findMany({
            take: 1
        });
        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/create-database ${database_name}`;
        await exec_command({
            command: command,
            projects_directory: projects_directory
        });
        const databases = await prisma.database.findMany();
        return response.json({
            createdDatabase: created_database,
            databases: databases
        });
    } catch(error) {
        return response.json({
            error: error
        });
    }
});

export default create_database;