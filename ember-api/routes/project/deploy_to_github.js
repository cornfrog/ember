import { Router } from "express";
import exec_command from "../../utils/exec_command.js";
import prisma from "../../lib/prisma.js";

const deploy_to_github = Router();

deploy_to_github.post("/", async (request, response) => {
    const projectId = request.body.projectId;
    const profileId = request.body.profileId;
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: profileId
            }
        });
        const project = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                githubEnabled: true,
            }
        });

        await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                githubRepo: `${profile.githubProfile}/${project.name}`
            }

        })

        const ember_directories = await prisma.settings.findMany({
            take: 1
        });

        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/create-gh-repo ${project.name}`;
        
        await exec_command({
            command: command,
            projects_directory: projects_directory
        });

        return response.json({
            updatedProject: project
        })
    } catch (error) {
        return response.json({
            error: error
        });
    }
});

export default deploy_to_github;