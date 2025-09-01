import { Router } from "express";
import prisma from "../../lib/prisma.js";

const update_database = Router();

update_database.post("/", async (request, response) => {
    const database_id = request.body.databaseId;
    const database_name = request.body.databaseName;
    try {
        const updated_database = await prisma.database.update({
            where: {
                id: database_id
            },
            data: {
                name: database_name
            }
        });
        return response.json({
            updatedDatabase: update_database
        });
    } catch(error) {
        return response.json({
            error: error
        });
    }
});

export default update_database;