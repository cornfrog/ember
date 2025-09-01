import { Router } from "express";
import prisma from "../../lib/prisma.js";

const update_settings = Router();

update_settings.post("/", async(request,response) => {
    const projects_dir = request.body.projectsDir;
    const scripts_dir = request.body.scriptsDir;

    try {
        const updated_settings = await prisma.settings.update({
            where: {
                id: "settings"
            },
            data: {
                projectsDir: projects_dir,
                scriptsDir: scripts_dir
            }
        });
        return response.json({
            settings: updated_settings
        });
    } catch(error){
        return response.json({
            error: error
        });
    }
});

export default update_settings;