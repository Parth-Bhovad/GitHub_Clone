import api from "../../../axiosInstance/axios"

export const uploadProfilePic = async (username, formData) => {
    let response = await api.post(`/upload/${username}`, formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        },
    );

    return response.data;
}

export const follow = async (userID) => {
    let response = await api.patch(`/following/${userID}`);
    return response.data.isFollow;
}

export const isFollowing = async (userID) => {
    let response = await api.get(`/is-following/${userID}`);
    return response.data;
}

export const fetchUserDetails = async (username) => {
    const response = await api.get(
        `/userProfile/${username}`,
    );

    return response.data;
}

export const fetchUserProfileUrl = async (username) => {
    const response = await api.get(`/profileUrl/${username}`);
    return response.data;
}

export const fetchUsernameFromId = async (userId) => {
    try {
        const response = await api.get(
            `/username/${userId}`,
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}