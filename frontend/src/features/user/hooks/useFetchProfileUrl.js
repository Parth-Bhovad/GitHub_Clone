import { useEffect, useState } from "react";

//importing APIs
import { fetchUserProfileUrl } from "../api/userAPI"

function useFetchProfileUrl(username) {
    const [profileUrl, setProfileUrl] = useState(null);

    const handleFetchUserProfileUrl = async (username) => {
        if (username) {
            try {
                const url = await fetchUserProfileUrl(username)

                setProfileUrl(url);
            } catch (error) {
                console.error("Cannot fetch user profileUrl: ", error);
            }
        }
    }

    useEffect(() => {
        handleFetchUserProfileUrl(username);
    }, [username]);
    return { profileUrl };
}

export default useFetchProfileUrl;