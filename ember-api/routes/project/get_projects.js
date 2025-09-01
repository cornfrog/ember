import { Router } from "express";
import prisma from "../../lib/prisma.js";

const get_projects = Router();

get_projects.get("/", async (request, response) => {
    try {
        const projects = await prisma.project.findMany();
        return response.json({
            projects: projects
        });
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

get_projects.get("/backend-projects", async (request, response) => {
    try {
        const backend_projects = await prisma.project.findMany({
            where: {
                type: "BACKEND"
            }
        });
        return response.json({
            projects: backend_projects
        });
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

export default get_projects;