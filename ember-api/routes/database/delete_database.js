import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const delete_database = Router();

delete_database.post("/", async (request, response) => {
    const database_id = request.body.id;
    try {
        const deletedDatabase = await prisma.database.delete({
            where: {
                id: database_id
            }
        });
        const ember_directories = await prisma.settings.findMany({
            take: 1
        });
        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/delete-database ${deletedDatabase.name}`;
        await exec_command({
            command: command,
            projects_directory: projects_directory
        });
        const databases = await prisma.database.findMany();
        return response.json({
            databases: databases
        });
    } catch (error) {
        return response.json({
            error: error
        })
    }
});

export default delete_database;