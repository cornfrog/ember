import { Router } from "express";
import prisma from "../../lib/prisma.js";

const update_profile = Router();

update_profile.post("/", async(request, response) => {
    
    const profile_id = request.body.profileId;
    const profile_name = request.body.profileName;
    const profile_editor = request.body.profileEditor;
    const profile_github_profile = request.body.profileGithubProfile;
    const profile_cloudflare_profile = request.body.profileCloudflareProfile;
    const profile_render_profile = request.body.profileRenderProfile;

    try { 
        const updated_profile = await prisma.profile.update({
            where: {
                id: profile_id
            },
            data:{
                name: profile_name,
                editor: profile_editor,
                githubProfile: profile_github_profile,
                cloudflareProfile: profile_cloudflare_profile,
                renderProfile: profile_render_profile
            }
        });
        return response.json({
            updatedProfile: updated_profile
        })
    } catch (error) {   
        return response.json({
            error: error
        });
    }
})

export default update_profile;