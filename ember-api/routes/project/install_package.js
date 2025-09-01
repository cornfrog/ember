import { Router } from "express";
import prisma from "../../lib/prisma.js";
import exec_command from "../../utils/exec_command.js";

const install_package = Router();

install_package.post("/", async (request, response) => {
    try {
        const projectId = request.body.projectId;
        const package_name = request.body.packageName;

        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        });

        const ember_directories = await prisma.settings.findMany({
            take: 1
        });
        const projects_directory = ember_directories[0].projectsDir;
        const scripts_directory = ember_directories[0].scriptsDir;
        const command = `${scripts_directory}/install-package ${project.name} ${package_name}`;
        let install_package_response = "";
        try {
            const install_package_command = await exec_command({
                command: command,
                projects_directory: projects_directory
            });
        } catch (error) {
            if(error.message.includes("ENOVERSIONS")){
                install_package_response = "PACKAGE NOT FOUND"

                return response.status(400).json({
                    error: install_package_response
                })
            }
        }


        return response.json({
            message:  "success"
        });

    } catch (error) {
        return response.json({
            error: error
        })
    }
});

export default install_package;