import "../assets/pages/Settings.scss";
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../context/ProfileProvider";
import { CONFIG } from "../config";
import EmberSettingsForm from "../components/forms/EmberSettingsForm";

const Settings = () => {

    const { profile, setProfile } = useContext(ProfileContext);
    const [emberSettings, setEmberSettings] = useState(null);
    const emberSettingsRoute = `${CONFIG.apiHost}/ember/settings/get-settings`;
    const [loading, isLoading] = useState(false);

    const fetchEmberSettings = async () => {
        isLoading(true);
        try {
            const emberSettingsRequest = await fetch(emberSettingsRoute);
            const emberSettingsResponse = await emberSettingsRequest.json();
            setEmberSettings(emberSettingsResponse.settings);
            isLoading(false);
        } catch (error) {
            console.log(error);
            isLoading(false);
        }
    }

    useEffect(() => {
        fetchEmberSettings();
    }, []);

    return (


        <div className="settings page">
            <h1 className="page-title">Settings</h1>
            {
                loading || emberSettings === null || profile === null ?
                    <p>Loading...</p> :
                    <EmberSettingsForm 
                        emberSettings={emberSettings}
                        setEmberSettings={setEmberSettings}
                    />
            }
        </div>

    )
}

export default Settings;