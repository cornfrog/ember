import FavoriteProject from "./FavoriteProject";
import ProjectDropdown from "./ProjectDropDown";
import { useNavigate } from "react-router";

const ProjectTile = ({
    project
}) => {

    const navigate = useNavigate();

    const goToProjectPage = () => {
        navigate(`/projects/${project.id}`);
    }

    return (
        <div
            onClick={goToProjectPage}
            className="project-tile pointer"
        >
            <div className="flex-align-center-justify-between">
                <div className="flex-align-center-justify-center gap-1r">
                    <i
                        className={project.type === "FRONTEND" ?
                            'frontend-icon' : 'backend-icon'}
                    ></i>
                    {project.name}
                </div>
                <div className="flex-align-center-justify-center gap-1r">
                    <FavoriteProject
                        projectId={project.id}
                        favorited={project.favorited}
                    />
                    <ProjectDropdown project={project} />
                </div>
            </div>
            <div className="project-links margin-tb-1r">
                {
                    project.githubEnabled ?
                        <div className="flex-align-center-justify-start padding-tb-1r gap-1r">
                            <i
                                className="github-icon"
                            ></i>
                            <a
                                href={project.githubRepo}
                                target="_blank"
                                className="project-github-link"
                            >
                                {project.githubRepo}
                            </a>
                        </div>
                        : ''
                }
                {
                    project.type === "FRONTEND" && project.cloudflareEnabled ?
                        <div className="flex-align-center-justify-start padding-tb-1r gap-1r">
                            <i
                                className="cloudflare-icon"
                            ></i>
                            <a
                                href={project.cloudflarePage}
                                target="_blank"
                                className="project-cloudflare-link"
                            >
                                {project.cloudflarePage}
                            </a>
                        </div>
                        : ''
                }
                {
                    project.type === "BACKEND" && project.database ?
                        <div className="flex-align-center-justify-start padding-tb-1r gap-1r">
                            <i
                                className="databases-icon"
                            ></i>
                            <p>
                                {project.database}
                            </p>
                        </div>
                        : ''
                }
            </div>
        </div>
    )
}

export default ProjectTile;