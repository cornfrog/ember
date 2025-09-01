import { useContext } from "react"
import { ProjectsContext } from "../../context/ProjectsProvider"
import { CONFIG } from "../../config";

const FavoriteProject = ({ projectId, favorited }) => {

    const { setProjects } = useContext(ProjectsContext);
    const favoriteRoute = `${CONFIG.apiHost}/ember/project/favorite-project`;

    const favoriteProject = async (event) => {
        event.stopPropagation();
        try {
            const favoriteRequest = await fetch(favoriteRoute, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: projectId,
                })
            });
            const favoriteResponse = await favoriteRequest.json();
            const updatedProjects = favoriteResponse.projects;
            setProjects(updatedProjects);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <i
            className={`star-icon ${favorited ? '' : 'grey'}`}
            onClick={favoriteProject}
        ></i>
    )
}

export default FavoriteProject;