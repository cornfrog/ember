import { useContext, useState, useEffect, useRef } from "react";
import { CONFIG } from "../../config";
import { ProfileContext } from "../../context/ProfileProvider";
import Popup from "../Popup";
import { ProjectsContext } from "../../context/ProjectsProvider";

const ProjectDropdown = ({
    project
}) => {

    const { profile } = useContext(ProfileContext);
    const { setProjects } = useContext(ProjectsContext);
    const [displayingDropdown, setDisplayDropdown] = useState(false);
    const [displayPopup, setDisplayPopup] = useState('hidden');
    const ref = useRef(null);

    const displayDropdown = (event) => {
        event.stopPropagation();
        setDisplayDropdown(!displayingDropdown);
    }

    const openEditor = async (event) => {
        event.stopPropagation();
        try {
            const openInEditorRequest = await fetch(`${CONFIG.apiHost}/ember/project/edit-project`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: project.id,
                    profileId: profile.id
                })
            });
            const openInEditorResponse = await openInEditorRequest.json();
            setDisplayDropdown(false);
        } catch (error) {
            console.log(error)
            setDisplayDropdown(false);
        }
    }

    const openTerminal = async (event) => {
        event.stopPropagation();
        try {
            const openInTerminalRequest = await fetch(`${CONFIG.apiHost}/ember/project/open-in-cli`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: project.id
                })
            });
            const openInTerminalResponse = await openInTerminalRequest.json();
            setDisplayDropdown(false);
        } catch (error) {
            console.log(error)
            setDisplayDropdown(false);
        }
    }

    const deleteProject = async (event) => {
        event.stopPropagation();
        try {
            const deleteProjectRequest = await fetch(`${CONFIG.apiHost}/ember/project/delete-project`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: project.id
                })
            });
            const deleteProjectResponse = await deleteProjectRequest.json();
            const updatedProjects = deleteProjectResponse.projects;
            setProjects(updatedProjects);
            setDisplayPopup('fade-out');
            setTimeout(() => {
                setDisplayPopup('hidden');
            }, 400);

        } catch (error) {
            console.log(error);
        }
    }

    const displayDeletePopup = (event) => {
        event.stopPropagation();
        setDisplayPopup("fade-in");
        setDisplayDropdown(false);
    }

    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setDisplayDropdown(false);
            }
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    return (
        <>
            <div className="dropdown-wrapper" ref={ref}>
                <i
                    className="dots-icon"
                    onClick={displayDropdown}
                ></i>
                <div className={`${displayingDropdown ? 'show' : 'hide'} 
                    tile-dropdown-container`} >
                    <p
                        className="menu-option"
                        onClick={openEditor}
                    >
                        <i className="edit-icon"></i>
                        Open In Editor
                    </p>
                    <p
                        className="menu-option"
                        onClick={openTerminal}
                    >
                        <i className="cli-icon"></i>
                        Open In Terminal
                    </p>
                    <p
                        className="menu-option"
                        onClick={displayDeletePopup}
                    >
                        <i className="delete-icon"></i>
                        Delete Project
                    </p>
                </div>
            </div>
            <Popup
                currentClass={displayPopup}
                setCurrentClass={setDisplayPopup}
                title={"Delete Project?"}
                confirmText={"Delete"}
                confirmAction={deleteProject}
                text={`Are you sure delete ${project.name}?`}
            />
        </>
    )

}

export default ProjectDropdown;