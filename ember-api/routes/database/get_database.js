import { Router } from "express";
import prisma from "../../lib/prisma.js";

const get_database = Router();

get_database.post("/", async (request, response) => {
    const database_id = request.body.databaseId;
    try {
        const database = await prisma.database.findUnique({
            where: {
                id: database_id
            }
        });
        return response.json({
            database: database
        });
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

export default get_database;