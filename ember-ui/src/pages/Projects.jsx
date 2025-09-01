import { useContext } from "react";
import "../assets/pages/Projects.scss";
import { ProfileContext } from "../context/ProfileProvider";
import ProjectsProvider from "../context/ProjectsProvider";
import ProjectList from "../components/ProjectComponents/ProjectList";

const Projects = () => {

    const { profile } = useContext(ProfileContext);

    return (
        <div className="projects page">
            {
                !profile || profile === null ?
                    <p>Loading</p> :
                    <ProjectsProvider>
                        <h1 className="page-title">{profile.name}'s Projects</h1>
                        <ProjectList />
                    </ProjectsProvider>
            }
        </div>
    )
}

export default Projects;