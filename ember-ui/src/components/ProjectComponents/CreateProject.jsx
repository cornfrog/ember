import { useContext, useState } from "react";
import { ProjectsContext } from "../../context/ProjectsProvider";
import { CONFIG } from "../../config";
import LoadingWheel from "../LoadingWheel";

const CreateProject = () => {

    const { projects, setProjects } = useContext(ProjectsContext);
    const [createProjectClass, setCreateProjectClass] = useState('hidden');
    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('FRONTEND');
    const [projectNameError, setProjectNameError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleCreateProjectForm = () => {
        setCreateProjectClass('fade-in');
    }

    const clearInputs = () => {
        setProjectName('');
        setProjectType('FRONTEND');
    }

    const clearErrors = () => {
        setProjectNameError('');
    }

    const validProject = () => {
        const alreadyExists = projects.some(project => project.name === projectName);
        if (projectName.trim() === "") {
            setProjectNameError("* Project name cannot be empty");
            setLoading(false);
            return false;
        } else if (alreadyExists) {
            setProjectNameError("* Project already exists");
            setLoading(false);
            return false;
        }
        return true;
    }

    const hideCreateProjectForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        setCreateProjectClass('fade-out');
        setTimeout(() => {
            setCreateProjectClass('hidden');
            clearErrors();
            clearInputs();
        }, 400);
    }

    const collectInput = (event) => {
        setProjectName(event.currentTarget.value);
    }

    const collectProjectType = (event) => {
        setProjectType(event.currentTarget.value);
    }

    const createProject = async (event) => {
        event.preventDefault();
        clearErrors();
        setLoading(true);
        if (!validProject()) return;
        try {
            const createProjectRequest = await fetch(`${CONFIG.apiHost}/ember/project/create-project`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectName: projectName,
                    projectType: projectType
                })
            });
            const createProjectResponse = await createProjectRequest.json();
            const newProjectList = createProjectResponse.projects;
            setProjects(newProjectList);
            setLoading(false);
            clearErrors();
            clearInputs();
            hideCreateProjectForm();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <>
            <button
                className="
                    flex-align-center-justify-center 
                    gap-1r
                    padding-tb-1-2r
                    padding-lr-1r
                    font-size-1-15r
                    pointer
                    create-project-button
                "
                onClick={toggleCreateProjectForm}
            >
                Create Project
                <i
                    className="add-icon"
                ></i>
            </button>
            <div
                className={`
                    create-project-form-container
                    ${createProjectClass}
                `}
            >
                <form 
                    className="create-project-form"
                    onSubmit={createProject}
                >
                    <p
                        className="create-form-title"
                    >
                        Enter New Project Details:
                    </p>
                    <div className="create-project-type">
                        Project Type:
                        <label htmlFor="frontend">
                            <input
                                type="radio"
                                id="frontend"
                                name="project_type"
                                value="FRONTEND"
                                checked={projectType === "FRONTEND"}
                                onChange={collectProjectType}
                            />
                            Frontend
                        </label>
                        <label htmlFor="backend">
                            <input
                                type="radio"
                                id="backend"
                                name="project_type"
                                value="BACKEND"
                                checked={projectType === "BACKEND"}
                                onChange={collectProjectType}
                            />
                            Backend
                        </label>
                    </div>
                    <label
                        htmlFor="projectName"
                        className="create-form-label"
                    >
                        <input
                            type="text"
                            className="create-form-input"
                            value={projectName}
                            onChange={collectInput}
                            placeholder="New Project Name Here..."
                        />
                    </label>
                    <p className={`${projectNameError ? '' : 'hidden'} error-text`}>
                        {projectNameError}
                    </p>
                    <div className="create-form-control-buttons">
                        <button
                            className="cancel-button control-buttons"
                            onClick={hideCreateProjectForm}
                            disabled={loading}
                        >
                            Cancel
                            <i
                                className="cancel-icon"
                            >
                            </i>
                        </button>
                        <button
                            className="create-button control-buttons"
                            disabled={loading}
                        >
                            {loading ?
                                <LoadingWheel 
                                    text={"Loading"}
                                    color={"orange"}
                                />
                                :
                                <>
                                    Add Project
                                    <i
                                        className="add-icon"
                                    >
                                    </i>
                                </>
                            }
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateProject;