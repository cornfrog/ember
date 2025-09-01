import { Router } from "express";
import prisma from "../../lib/prisma.js";

const favorite_project = Router();

favorite_project.post("/", async(request, response) => {
    try {
        const project_id = request.body.projectId; 
        const current_project = await prisma.project.findUnique({
            where:{
                id: project_id
            }
        });
        const project = await prisma.project.update({
            where: {
                id: project_id
            },
            data: {
                favorited: !current_project.favorited
            }
        });
        const projects = await prisma.project.findMany();
        return response.json({
            updatedProject: project,
            projects: projects
        });
    } catch(error) {
        return response.json(error);
    }
})

export default favorite_project;