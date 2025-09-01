import { Router } from "express";
import prisma from "../../lib/prisma.js";

const get_settings = Router();

get_settings.get("/", async (request, response) => {
    try {
        const settings = await prisma.settings.findMany({
            take: 1
        });
        return response.json({
            settings: settings[0]
        });
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

export default get_settings;