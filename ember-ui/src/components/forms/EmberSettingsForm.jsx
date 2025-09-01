import { useContext, useState } from "react";
import { ProfileContext } from "../../context/ProfileProvider";
import { CONFIG } from "../../config";
import Popup from "../Popup";

const EmberSettingsForm = ({
    emberSettings,
    setEmberSettings
}) => {

    const { profile, setProfile } = useContext(ProfileContext);

    const [projectsDir, setProjectsDir] = useState(emberSettings.projectsDir);
    const [projectDirError, setProjectDirError] = useState('');
    const [scriptsDir, setScriptsDir] = useState(emberSettings.scriptsDir);
    const [scriptDirError, setScriptDirError] = useState('');

    const [profileName, setProfileName] = useState(profile.name);
    const [profileNameError, setProfileNameError] = useState('');
    const [profileEditor, setProfileEditor] = useState(profile.editor);
    const [profileEditorError, setProfileEditorError] = useState('');
    const [profileGithub, setProfileGithub] = useState(profile.githubProfile);
    const [profileGithubError, setProfileGithubError] = useState('');
    const [profileCloudflare, setProfileCloudflare] = useState(profile.cloudflareProfile);
    const [profileCloudflareError, setProfileCloudflareError] = useState('');
    const [profileRender, setProfileRender] = useState(profile.renderProfile);
    const [profileRenderError, setProfileRenderError] = useState('');

    const [displaySettingsPopup, setSettingsPopupClass] = useState('hidden');
    const [displayProfileSettingsPopup, setProfileSettingsPopupClass] = useState('hidden');

    const collectInput = (event) => {
        if (event.currentTarget.name === "projectsDir") {
            setProjectsDir(event.currentTarget.value);
        } else if (event.currentTarget.name === "scriptsDir") {
            setScriptsDir(event.currentTarget.value);
        } else if (event.currentTarget.name === "profileName") {
            setProfileName(event.currentTarget.value);
        } else if (event.currentTarget.name === "profileEditor") {
            setProfileEditor(event.currentTarget.value);
        } else if (event.currentTarget.name === "profileGithub") {
            setProfileGithub(event.currentTarget.value);
        } else if (event.currentTarget.name === "profileCloudflare") {
            setProfileCloudflare(event.currentTarget.value);
        } else if (event.currentTarget.name === "profileRender") {
            setProfileRender(event.currentTarget.value);
        }
    }

    const validateProfileSettings = () => {
        if (projectsDir.trim() === "") {
            setProjectDirError("Error: Project Directory cannot be empty");
            return false;
        }
        if (scriptsDir.trim() === "") {
            setScriptDirError("Error: Scripts Directory cannot be empty");
            return false;
        }
        if (profileName.trim() === "") {
            setProfileNameError("Error: Profile Name cannot be empty");
            return false;
        }
        if (profileEditor.trim() === "") {
            setProfileEditorError("Error: Profile Editor cannot be empty");
            return false;
        }
        return true;
    }

    const updateDirectorySettings = async (event) => {
        event.preventDefault();
        console.log("updating settings")
        const updateDirectorySettingsRoute = `${CONFIG.apiHost}/ember/settings/update-settings`;
        if (!validateProfileSettings()) return;
        try {
            const updateSettingsRequest = await fetch(updateDirectorySettingsRoute, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectsDir: projectsDir,
                    scriptsDir: scriptsDir
                })
            });
            const updateSettingsResponse = await updateSettingsRequest.json();
            const updatedSettings = updateSettingsResponse.settings;
            setEmberSettings(updatedSettings);
            setSettingsPopupClass("fade-in");
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfileSettings = async (event) => {
        event.preventDefault();
        const updateProfileSettingsRoute = `${CONFIG.apiHost}/ember/profile/update-profile`;
        if (!validateProfileSettings()) return;
        try {
            const updateProfileSettingsRequest = await fetch(updateProfileSettingsRoute, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    profileId: profile.id,
                    profileName: profileName,
                    profileEditor: profileEditor,
                    profileGithubProfile: profileGithub,
                    profileCloudflareProfile: profileCloudflare,
                    profileRenderProfile: profileRender
                })
            });
            const updateProfileSettingsResponse = await updateProfileSettingsRequest.json();
            const updatedProfileSettings = updateProfileSettingsResponse.updatedProfile;
            setProfile(updatedProfileSettings);
            setProfileSettingsPopupClass("fade-in");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h2 className="center-text">Folder Settings</h2>
            <form onSubmit={updateDirectorySettings}>
                <div
                    className="
                        flex-align-center-justify-start
                        flex-column
                        gap-1-2r
                    "
                >
                    <label
                        htmlFor="projectsDir">
                        Projects Directory:
                    </label>
                    <input
                        className="
                                font-size-1-15r
                                margin-tb-1-2r
                                padding-1-2r
                            "
                        type="text"
                        name="projectsDir"
                        value={projectsDir}
                        onChange={collectInput}
                    />
                    {projectDirError ?
                        <p className="error-text">{projectDirError}</p>
                        : ''
                    }
                    <label
                        className="margin-b-2r"
                    >
                        This is where your projects are located.
                    </label>
                    <label
                        htmlFor="scriptsDir"
                    >
                        Scripts Directory:
                    </label>
                    <input
                        className="
                                font-size-1-15r
                                margin-tb-1-2r
                                padding-1-2r
                            "
                        type="text"
                        name="scriptsDir"
                        value={scriptsDir}
                        onChange={collectInput}
                    />
                    {scriptDirError ?
                        <p className="error-text">{scriptDirError}</p>
                        : ''
                    }
                    <label
                        className="margin-b-2r"
                    >
                        This is where ember scripts are located.
                    </label>
                </div>
                <input
                    className="
                        update-button
                        display-block
                        margin-l-auto
                        margin-r-4r
                        margin-t-1r
                        font-size-1-15r
                        padding-lr-1r
                        padding-tb-1-2r
                        pointer
                    "
                    type="submit"
                    value="Update Folders"
                />
            </form>
            <Popup
                currentClass={displaySettingsPopup}
                setCurrentClass={setSettingsPopupClass}
                isAlert={true}
                title={"Settings Updated"}
                text={`Your directory settings have been updated`}
            />
            <hr />
            <h2 className="center-text">Profile Settings</h2>
            <form onSubmit={updateProfileSettings}>
                <div
                    className="
                        flex-align-center-justify-start
                        flex-column
                        gap-1-2r
                    "
                >
                    <label
                        htmlFor="profileName">
                        Profile Name:
                    </label>
                    <input
                        className="
                                font-size-1-15r
                                margin-tb-1r
                                padding-1-2r
                            "
                        type="text"
                        name="profileName"
                        value={profileName}
                        onChange={collectInput}
                    />
                    {profileNameError ?
                        <p className="error-text">{profileNameError}</p>
                        : ''
                    }
                    <label
                        htmlFor="profileEditor"
                    >
                        Main Editor:
                    </label>
                    <input
                        className="
                                font-size-1-15r
                                margin-tb-1r
                                padding-1-2r
                            "
                        type="text"
                        name="profileEditor"
                        value={profileEditor}
                        onChange={collectInput}
                    />
                    {profileEditorError ?
                        <p className="error-text">{profileEditorError}</p>
                        : ''
                    }
                    <label
                        htmlFor="githubProfile">
                        Github Profile:
                    </label>
                    <input
                        className="
                                font-size-1-15r
                                margin-tb-1r
                                padding-1-2r
                            "
                        type="text"
                        name="profileGithub"
                        value={profileGithub}
                        onChange={collectInput}
                    />
                    {profileGithubError ?
                        <p className="error-text">{profileGithubError}</p>
                        : ''
                    }
                    <label
                        htmlFor="cloudflareProfile"
                    >
                        Cloudflare Profile:
                    </label>
                    <input
                        className="
                                font-size-1-15r
                                margin-tb-1r
                                padding-1-2r
                            "
                        type="text"
                        name="profileCloudflare"
                        value={profileCloudflare}
                        onChange={collectInput}
                    />
                    {profileCloudflareError ?
                        <p className="error-text">{profileCloudflareError}</p>
                        : ''
                    }
                    <label
                        htmlFor="profileRender">
                        Render Profile:
                    </label>
                    <input
                        className="
                                font-size-1-15r
                                margin-tb-1r
                                padding-1-2r
                            "
                        type="text"
                        name="profileRender"
                        value={profileRender}
                        onChange={collectInput}
                    />
                    {profileRenderError ?
                        <p className="error-text">{profileRenderError}</p>
                        : ''
                    }
                </div>
                <input
                    className="
                        update-button
                        display-block
                        margin-l-auto
                        margin-r-4r
                        font-size-1-15r
                        padding-lr-1r
                        padding-tb-1-2r
                        margin-t-1r
                        pointer
                    "
                    type="submit"
                    value="Update Profiles"
                />
            </form>
            <Popup
                currentClass={displayProfileSettingsPopup}
                setCurrentClass={setProfileSettingsPopupClass}
                isAlert={true}
                title={"Profile Settings Updated"}
                text={`Your profile settings have been updated`}
            />
        </>
    )

}

export default EmberSettingsForm;