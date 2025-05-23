import { useEffect, useState } from "react";

// import APIs
import { follow, isFollowing } from "../api/userAPI";

function useHandleFollow(currentUser, userDetailsId) {

    const [isFollow, setIsFollow] = useState();

    const handleFollow = async () => {
        try {
            let response = await follow(userDetailsId);
            setIsFollow(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleIsFollowing = async () => {
        try {
            let response = await isFollowing(userDetailsId);

            setIsFollow(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userDetailsId) {
            if (currentUser != userDetailsId) {
                handleIsFollowing();
            }
        }
    }, [userDetailsId]);

    return (
        { handleFollow, isFollow, handleIsFollowing }
    );
}

export default useHandleFollow;