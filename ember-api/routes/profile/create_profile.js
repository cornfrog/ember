import { Router } from "express";
import prisma from "../../lib/prisma.js";

const create_profile = Router();

create_profile.post("/", async(request, response) => {
    
    const profile_name = request.body.name;
    const profile_editor = request.body.editor;
    const profile_github_profile = request.body.githubProfile;
    const profile_cloudflare_profile = request.body.cloudflareProfile;
    const profile_render_profile = request.body.renderProfile;

    try { 
        const created_profile = await prisma.profile.create({
            data:{
                name: profile_name,
                editor: profile_editor,
                githubProfile: profile_github_profile,
                cloudflareProfile: profile_cloudflare_profile,
                renderProfile: profile_render_profile
            }
        });
        await prisma.settings.create({data: {}});
        return response.json({
            createdProfile: created_profile
        })
    } catch (error) {   
        return response.json({
            error: error
        });
    }
})

export default create_profile;