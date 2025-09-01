import { Router } from "express";
import prisma from "../../lib/prisma.js";

const create_settings = Router();

create_settings.post("/", async (request, response) => {
    try {
        const created_settings = await prisma.settings.create({
            data:{}
        });
        return response.json({
            settings: created_settings
        });
    } catch(error) {
        return response.json({
            error: error
        });
    }
});

export default create_settings;