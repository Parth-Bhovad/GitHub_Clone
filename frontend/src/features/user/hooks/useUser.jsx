import { useEffect, useState } from "react";

// import APIs
import { uploadProfilePic, follow, fetchUserDetails, fetchUserProfileUrl, isFollowing } from "../api/userAPI";

function useUser(username) {

    const [userDetails, setUserDetails] = useState({ username: "username" });
    const [isFollow, setIsFollow] = useState();

    const [file, setFile] = useState(null);
    const [profileUrl, setProfileUrl] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const userId = localStorage.getItem("userId");

    const handleUpload = async () => {
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
                console.log(user);
                
                setUserDetails(user);
            } catch (err) {
                console.error("Cannot fetch user details: ", err);
            }
        }
    };

    const handleIsFollowing = async () => {
        try {
            let response = await isFollowing(userDetails._id);
            
            setIsFollow(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
       handleFetchUserDetails();
    }, []);

    useEffect(() => {
        if (userId != userDetails._id) {
            handleIsFollowing();
        }
    }, [userDetails]);

    const handleFetchUserProfileUrl = async () => {
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
        handleFetchUserProfileUrl()
    }, [profileUrl])

    return (
        {profileUrl, userId, userDetails, handleFileChange, handleUpload, handleFollow, isFollow, handleIsFollowing}
    );
}

export default useUser;