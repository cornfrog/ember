import { Router } from "express";
import prisma from "../../lib/prisma.js";

const get_databases = Router();

get_databases.get("/", async (request, response) => {
    try {
        const databases = await prisma.database.findMany();
        return response.json({
            databases: databases
        });
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

export default get_databases;