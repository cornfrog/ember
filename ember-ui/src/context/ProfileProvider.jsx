import { createContext, useState, useEffect } from "react";
import { CONFIG } from "../config";
import { useNavigate } from "react-router-dom";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {

    const [profile, setProfile] = useState(null);
    const [loading, isLoading] = useState(false);
    const profileRoute = `${CONFIG.apiHost}/ember/profile/get-profile`;
    const navigate = useNavigate();

    const fetchProfile = async () => {
        isLoading(true);
        try {
            const profileRequest = await fetch(profileRoute);
            const profileResponse = await profileRequest.json();
            const profile = profileResponse.profile;
            if(!profile){
                isLoading(false);
                navigate("/setup");
                return;
            }
            setProfile(profileResponse.profile);
            isLoading(false);
            return;
        } catch(error) {
            isLoading(false);
            console.log(error);
            return;
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                setProfile,
                loading
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider;