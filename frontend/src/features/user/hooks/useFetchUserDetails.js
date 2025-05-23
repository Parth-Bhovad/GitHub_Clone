import { useEffect, useState } from "react";

// import APIs
import { fetchUserDetails } from "../api/userAPI";

function useFetchUserDetails(username) {
    const [userDetails, setUserDetails] = useState({ username: "username" });

    const handleFetchUserDetails = async (username) => {
        if (username) {
            try {
                const user = await fetchUserDetails(username)
                setUserDetails(user);
            } catch (err) {
                console.error("Cannot fetch user details: ", err);
            }
        }
    };

    useEffect(() => {
        handleFetchUserDetails(username);
    }, [username]);

    return {userDetails};
}

export default useFetchUserDetails;