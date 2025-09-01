import { useContext, useEffect, useState } from "react";
import "../assets/pages/Project.scss";
import { useParams } from "react-router";
import { CONFIG } from "../config";
import Formaters from "../utils/Formaters";
import { ProfileContext } from "../context/ProfileProvider";
import ConnectToDatabase from "../components/ProjectComponents/ConnectToDatabase";
import LoadingWheel from "../components/LoadingWheel";
import InstallPackage from "../components/ProjectComponents/InstallPackage";

const Project = () => {

    const { projectId } = useParams();
    const { profile } = useContext(ProfileContext);
    const [project, setProject] = useState(null);
    const [databases, setDatabases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingGit, setLoadingGit] = useState(false);
    const [loadingGithub, setLoadingGithub] = useState(false);
    const [loadingPrisma, setLoadingPrisma] = useState(false);
    const [loadingCloudflare, setLoadingCloudflare] = useState(false);

    const projectRoute = `${CONFIG.apiHost}/ember/project/get-project`;
    const databasesRoute = `${CONFIG.apiHost}/ember/database/get-databases`;

    const fetchProject = async () => {
        try {
            const projectRequest = await fetch(projectRoute, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: projectId,
                })
            });
            const projectResponse = await projectRequest.json();
            const project = projectResponse.project;
            setProject(project);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const fetchDatabases = async () => {
        try {
            const databaseRequest = await fetch(databasesRoute);
            const databaseResponse = await databaseRequest.json();
            setDatabases(databaseResponse.databases);
        } catch (error) {
            console.log(error);
        }
    }

    const runProject = async () => {
        const runProjectRoute = `${CONFIG.apiHost}/ember/project/run-project`;
        const runProjectRequest = await fetch(runProjectRoute, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
            })
        });
    }

    const openInEditor = async () => {
        const openInEditorRoute = `${CONFIG.apiHost}/ember/project/edit-project`;
        const openInEditorRequest = await fetch(openInEditorRoute, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
                profileId: profile.id
            })
        });
    }

    const openInTerminal = async () => {
        const openInTerminalRoute = `${CONFIG.apiHost}/ember/project/open-in-cli`;
        const openInTerminalRequest = await fetch(openInTerminalRoute, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId
            })
        });
    }

    const enableGit = async () => {
        const enableGitRoute = `${CONFIG.apiHost}/ember/project/enable-git`;
        setLoadingGit(true);
        const enableGitRequest = await fetch(enableGitRoute, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId
            })
        });
        const enableGitResponse = await enableGitRequest.json();
        const updatedProject = enableGitResponse.updatedProject;
        setProject(updatedProject);
        setLoadingGit(false);
    }

    const deployToGithub = async () => {
        const deployToGithubRoute = project.githubEnabled ?
            `${CONFIG.apiHost}/ember/project/redeploy-to-github` :
            `${CONFIG.apiHost}/ember/project/deploy-to-github`;
        setLoadingGithub(true);
        const deployToGithubRequest = await fetch(deployToGithubRoute, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
                profileId: profile.id
            })
        });
        const deployToGitubResponse = await deployToGithubRequest.json();
        const updatedProject = deployToGitubResponse.updatedProject;
        setProject(updatedProject)
        setLoadingGithub(false);

    }

    const deployToClouadflare = async () => {
        const deployToClouadflareRoute = project.cloudflareEnabled ?
            `${CONFIG.apiHost}/ember/project/redeploy-to-cloudflare` :
            `${CONFIG.apiHost}/ember/project/deploy-to-cloudflare`;

        setLoadingCloudflare(true);
        const deployToClouadflareRequest = await fetch(deployToClouadflareRoute, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
            })
        });
        const deployToClouadflareResponse = await deployToClouadflareRequest.json();
        const updatedProject = deployToClouadflareResponse.updatedProject;
        setProject(updatedProject);
        setLoadingCloudflare(false);
    }

    const enablePrisma = async () => {
        const enablePrismaRoute = `${CONFIG.apiHost}/ember/project/enable-prisma`;
        setLoadingPrisma(true);
        const enablePrismaRequest = await fetch(enablePrismaRoute, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
            })
        });
        const enablePrismaResponse = await enablePrismaRequest.json();
        const updatedProject = enablePrismaResponse.updatedProject;
        setProject(updatedProject);
        setLoadingPrisma(false);
    }

    const viewDatabase = async () => {
        const enablePrismaRoute = `${CONFIG.apiHost}/ember/project/view-database`;
        const enablePrismaRequest = await fetch(enablePrismaRoute, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId: projectId,
            })
        });
    }

    useEffect(() => {
        fetchProject();
    }, []);

    useEffect(() => {
        if (project && project.type === "BACKEND") {
            fetchDatabases()
        }
    }, [project]);

    return (
        <div className="project page">
            {
                loading ?
                    <p>Loading...</p> :

                    <>
                        <h1 className="page-title">{project.name}</h1>
                        <div className="">
                            <p>Created: {Formaters.formatDate(project.createdAt)}</p>
                            <p>Last Updated: {Formaters.formatDate(project.updatedAt)}</p>
                        </div>
                        <h2>Actions:</h2>
                        <div className="flex-align-center-justify-center flex-column">
                            <button
                                onClick={runProject}
                            >
                                <i
                                    className="run-icon"
                                ></i>
                                Run Project
                            </button>
                            <InstallPackage project={project} />
                            <button onClick={openInEditor}>
                                <i
                                    className="edit-icon"
                                ></i>
                                Open in Editor
                            </button>
                            <button onClick={openInTerminal}>
                                <i
                                    className="cli-icon"
                                ></i>
                                Open in Terminal
                            </button>
                            <div
                                className="
                                    flex-align-center-justify-center
                                    gap-1r
                                "
                            >

                                <button onClick={enableGit} disabled={project.gitEnabled}>
                                    {
                                        loadingGit ?
                                            <LoadingWheel
                                                text={"Loading"}
                                                color={"transparent"}
                                            />
                                            :
                                            <>
                                                <i
                                                    className="git-icon"
                                                ></i>
                                                Enable Git
                                            </>
                                    }
                                </button>
                                {
                                    project.gitEnabled ?
                                        <p>Git Enabled!</p>
                                        : ''
                                }
                            </div>
                            {
                                project.gitEnabled ?
                                    <>
                                        <div
                                            className="
                                                flex-align-center-justify-center
                                                gap-1r
                                            "
                                        >
                                            <button onClick={deployToGithub} disabled={loadingGithub}>
                                                {
                                                    loadingGithub ?
                                                        <LoadingWheel
                                                            text={"Loading"}
                                                            color={"transparent"}
                                                        />
                                                        :
                                                        <>
                                                            <i
                                                                className="github-icon"
                                                            ></i>
                                                            {
                                                                project.githubEnabled ?
                                                                    <span>Redeploy to Github</span>
                                                                    : <span>Deploy to Github</span>
                                                            }
                                                        </>
                                                }
                                            </button>
                                            {
                                                project.githubEnabled ?
                                                    <p>Deployed to Github!</p>
                                                    : ''
                                            }
                                        </div>
                                    </>
                                    : ''
                            }

                            {
                                project.type === "FRONTEND" ?
                                    <>
                                        <div
                                            className="
                                                flex-align-center-justify-center
                                                gap-1r
                                            "
                                        >
                                            <button onClick={deployToClouadflare}>
                                                {
                                                    loadingCloudflare ?
                                                        <LoadingWheel
                                                            text={"Loading"}
                                                            color={"transparent"}
                                                        />
                                                        :
                                                        <>
                                                            <i
                                                                className="cloudflare-icon"
                                                            ></i>
                                                            {
                                                                project.cloudflareEnabled ?
                                                                    <span>Redeploy to Cloudflare</span>
                                                                    : <span>Deploy to Cloudflare</span>
                                                            }
                                                        </>
                                                }
                                            </button>
                                            {
                                                project.cloudflareEnabled ?
                                                    <p>Delpoyed to Cloudflare!</p>
                                                    : ''
                                            }
                                        </div>
                                    </>
                                    : ''
                            }
                            {
                                project.type === "BACKEND" ?
                                    <>
                                        <div
                                            className="
                                                flex-align-center-justify-center
                                                gap-1r
                                            "
                                        >
                                            <button onClick={enablePrisma} disabled={project.prismaEnabled}>
                                                {
                                                    loadingPrisma ?
                                                        <LoadingWheel
                                                            text={"Loading"}
                                                            color={"transparent"}
                                                        />
                                                        :
                                                        <>
                                                            <i
                                                                className="prisma-icon"
                                                            ></i>
                                                            Enable Prisma
                                                        </>
                                                }
                                            </button>
                                            {
                                                project.prismaEnabled ?
                                                    <p>Prisma Initialized</p>
                                                    : ''
                                            }
                                        </div>
                                        {
                                            project.prismaEnabled ?
                                                <ConnectToDatabase
                                                    project={project}
                                                    setProject={setProject}
                                                    databases={databases}
                                                />
                                                : ''
                                        }
                                        {
                                            project.database ?
                                                <button onClick={viewDatabase}>
                                                    <i
                                                        className="prisma-icon"
                                                    ></i>
                                                    View Database
                                                </button>
                                                : ''
                                        }
                                    </>
                                    : ''
                            }
                        </div>
                    </>
            }
        </div>

    )
}

export default Project;