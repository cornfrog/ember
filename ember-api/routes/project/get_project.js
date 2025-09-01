import { Router } from "express";
import prisma from "../../lib/prisma.js";

const get_project = Router();

get_project.post("/", async(request, response) => {
    const project_id = request.body.projectId;
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: project_id
            }
        });
        return response.json({
            project: project
        });
    } catch(error) {
        return response.json({
            error: error
        });
    }
});

export default get_project;