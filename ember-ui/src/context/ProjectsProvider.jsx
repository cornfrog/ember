import { createContext, useEffect, useState } from "react";
import { CONFIG } from "../config";

export const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {

    const projectsRoute = `${CONFIG.apiHost}/ember/project/get-projects`;
    const [projects, setProjects] = useState([]);
    const [loading, isLoading] = useState(false);

    const fetchProjects = async () => {
        isLoading(true);
        try {
            const projectsRequest = await fetch(projectsRoute);
            const projectsResponse = await projectsRequest.json();
            const projects = projectsResponse.projects;
            setProjects(projects);
            isLoading(false);
        } catch (error) {
            console.log(error);
            isLoading(false);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        loading ?
            <p>Loading</p> :
            
            <ProjectsContext.Provider
                value={{
                    projects,
                    setProjects
                }}
            >
                {children}
            </ProjectsContext.Provider>
    )

}

export default ProjectsProvider;