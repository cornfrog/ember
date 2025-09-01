import { useContext, useState } from "react";
import { CONFIG } from "../../config";
import { ProfileContext } from "../../context/ProfileProvider";
import { useNavigate } from "react-router";

const SetupForm = () => {

    const { setProfile } = useContext(ProfileContext);
    const [profileName, setProfileName] = useState('');
    const [profileNameError, setProfileNameError] = useState('');
    const [profileEditor, setProfilelEditor] = useState('');
    const [profileGithub, setprofileGithub] = useState('');
    const [profileGithubError, setProfileGithubError] = useState('');
    const [profileCloudflare, setProfileCloudflare] = useState('');
    const [profileCloudflareError, setProfileCloudflareError] = useState('');
    const [profileRender, setProfileRender] = useState('');
    const [profileRenderError, setProfileRenderError] = useState('');
    const [loading, isLoading] = useState(false);
    const createProfileRoute = `${CONFIG.apiHost}/ember/profile/create-profile`;
    const navigate = useNavigate();

    const clearInputs = () => {
        setProfileName('');
        setProfilelEditor('');
        setprofileGithub('');
        setProfileCloudflare('');
        setProfileRender('');
    }

    const clearErrors = () => {
        setProfileNameError('');
        setProfileGithubError('');
        setProfileCloudflareError('');
        setProfileRenderError('');
    }

    const collectInputs = (event) => {
        if (event.currentTarget.name === "profileName")
            setProfileName(event.currentTarget.value);
        if (event.currentTarget.name === "profileEditor")
            setProfilelEditor(event.currentTarget.value);
        if (event.currentTarget.name === "profileGithub")
            setprofileGithub(event.currentTarget.value);
        if (event.currentTarget.name === "profileCloudflare")
            setProfileCloudflare(event.currentTarget.value);
        if (event.currentTarget.name === "profileRender")
            setProfileRender(event.currentTarget.value);
    }

    const validProfileSettings = () => {
        let isValid = true;
        const githubProfileRegex = /^https:\/\/github\.com\/[a-zA-Z0-9-]+$/;
        if (profileName.trim() === "") {
            setProfileNameError("* No Name Entered");
            isLoading(false);
            isValid = false;
        }
        if (profileGithub.trim() !== "" && !githubProfileRegex.test(profileGithub)) {
            setProfileGithubError("* Invalid Github Profile Link");
            isLoading(false);
            isValid = false;
        }
        return isValid;
    }

    const setupProfile = async (event) => {
        event.preventDefault();
        clearErrors();
        isLoading(true);
        if (!validProfileSettings()) return;
        try {
            const profileSettings = {
                name: profileName,
                editor: profileEditor,
                githubProfile: profileGithub,
                cloudflareProfile: profileCloudflare,
                renderProfile: profileRender
            }
            const createProfileRequest = await fetch(createProfileRoute, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileSettings)
            });
            const createProfileResponse = await createProfileRequest.json();
            const createdProfile = createProfileResponse.createdProfile;
            setProfile(createdProfile);
            clearInputs();
            isLoading(false);
            navigate("/projects")
            return;
        } catch (error) {
            console.log(error);
            isLoading(false);
            return;
        }
    }

    return (
        <form className="setup-form form" onSubmit={setupProfile}>
            <label htmlFor="profileName" className="form-label">
                Profile Name:
                <input
                    type="text"
                    name="profileName"
                    placeholder="Profile Name Here..."
                    className="form-input"
                    value={profileName}
                    onChange={collectInputs}
                />
            </label>
            {
                profileNameError ?
                    <p className="error-text">{profileNameError}</p>
                    : ''
            }
            <label htmlFor="profileEditor" className="form-label">
                Profile Editor:
                <input
                    type="text"
                    name="profileEditor"
                    placeholder="Profile Editor Here..."
                    className="form-input"
                    value={profileEditor}
                    onChange={collectInputs}
                />
            </label>
            <label htmlFor="profileGithub" className="form-label">
                Link to Github Profile:
                <input
                    type="text"
                    name="profileGithub"
                    placeholder="Profile link here..."
                    className="form-input"
                    value={profileGithub}
                    onChange={collectInputs}
                />
            </label>
            {
                profileGithubError ?
                    <p className="error-text">{profileGithubError}</p>
                    : ''
            }
            <label htmlFor="profileCloudflare" className="form-label">
                Link to Cloudflare Profile:
                <input
                    type="text"
                    name="profileCloudflare"
                    placeholder="Profile link here..."
                    className="form-input"
                    value={profileCloudflare}
                    onChange={collectInputs}
                />
            </label>
            {
                profileCloudflareError ?
                    <p className="error-text">{profileCloudflareError}</p>
                    : ''
            }
            <label htmlFor="profileRender" className="form-label">
                Link to Render Profile:
                <input
                    type="text"
                    name="profileRender"
                    placeholder="Profile link here..."
                    className="form-input"
                    value={profileRender}
                    onChange={collectInputs}
                />
            </label>
            {
                profileRenderError ?
                    <p className="error-text">{profileRenderError}</p>
                    : ''
            }
            <input type="submit" className="complete-setup" value="Complete Setup" />
        </form>
    )
}

export default SetupForm;