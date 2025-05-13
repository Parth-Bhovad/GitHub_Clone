import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//importing APIs
import { createRepo } from "../api/createRepoAPI";
import { fetchUsernameFromId, fetchUserProfileUrl } from "../../user/api/userAPI"

function useCreateRepo() {

    const [reponame, setRepoName] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    // const [visibility, setVisibility] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [profileUrl, setProfileUrl] = useState(null);
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    useEffect(() => {
        const handleFetchUsernameFromId = async (userId) => {
            try {
                const fetchedUsername = await fetchUsernameFromId(userId)
                setUsername(fetchedUsername);
            } catch (error) {
                console.log(error);
            }
        }

        handleFetchUsernameFromId(userId);
        const handleFetchUserProfileUrl = async (username) => {
            // const userId = localStorage.getItem("userId");

            if (username) {
                try {
                    const url = await fetchUserProfileUrl(username)

                    setProfileUrl(url);
                } catch (error) {
                    console.error("Cannot fetch user profileUrl: ", error);
                }
            }
        }

        handleFetchUserProfileUrl(username)
    }, [username]);

    const handleUpload = async () => {
        try {
            await createRepo(reponame, description, visibility, userId, username);

            navigate("/");

        } catch (error) {
            console.log("error during repo creating", error.message);
        }
    }


    return ({ reponame, setRepoName, description, setDescription, visibility, setVisibility, handleUpload, username, profileUrl });
}

export default useCreateRepo;