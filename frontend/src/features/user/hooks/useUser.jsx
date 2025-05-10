import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import authContext
import { useAuthContext } from "../context/authContext";

// import APIs
import { uploadProfilePic, follow, fetchUserDetails, fetchUserProfileUrl } from "../api/userAPI";

function useUser(username) {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({ username: "username" });
    const [isFollow, setIsFollow] = useState();
    const { setCurrentUser } = useAuthContext();

    const [file, setFile] = useState(null);
    const [profileUrl, setProfileUrl] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const userId = localStorage.getItem("userId");

    const handleUpload = async () => {
        console.log(username);
        
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("profileUrl", file);

        try {
            await uploadProfilePic(username, formData);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    const handleFollow = async () => {
        try {
            let response = await follow(userDetails._id);
            setIsFollow(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFetchUserDetails = async () => {
        // const userId = localStorage.getItem("userId");

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
        handleFetchUserDetails();
    }, []);

    useEffect(() => {
        const handleFetchUserProfileUrl = async () => {
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

        handleFetchUserProfileUrl()
    }, [profileUrl])

    return (
        {profileUrl, userId, userDetails, handleFileChange, handleUpload, handleFollow, isFollow}
    );
}

export default useUser;