import { Router } from "express";
import prisma from "../../lib/prisma.js";

const get_profile = Router();

get_profile.get("/", async (request, response) => {
    try {
        const profile = await prisma.profile.findMany({
            take: 1
        });
        return response.json({
            profile: profile[0]
        });
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

export default get_profile;