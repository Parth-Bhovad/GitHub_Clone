import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//importing APIs
import { createRepo } from "../api/createRepoAPI";

function useCreateRepo() {

    const [reponame, setRepoName] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    // const [visibility, setVisibility] = useState("");
    const [visibility, setVisibility] = useState(false);
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsernameFromId = async (userId) => {
            try {
                const response = await api.get(
                    `/username/${userId}`,
                );
                setUsername(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsernameFromId(userId);
    }, [username]);

    const handleUpload = async () => {
        try {
            await createRepo(reponame, description, visibility, userId, username);

            navigate("/");

        } catch (error) {
            console.log("error during repo creating", error.message);
        }
    }


    return ({ reponame, setRepoName, description, setDescription, visibility, setVisibility, handleUpload });
}

export default useCreateRepo;