import { useState, useEffect } from "react";

//importing APIs
import {fetchUsernameFromId} from "../api/userAPI";

function useFetchUsernameFromId(currentUser) {
    const [username, setUsername] = useState("");

    const fetchData = async (currentUser) => {
        try {
            const fetchedUsername = await fetchUsernameFromId(currentUser);
            setUsername(fetchedUsername);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(currentUser);
    }, [currentUser]);

    return { username };
}

export default useFetchUsernameFromId;