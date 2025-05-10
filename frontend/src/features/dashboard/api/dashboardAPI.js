//importing axios instance
import api from "../../../axiosInstance/axios"

export const fetchRepositories = async (userId) => {
    const response = await api.get(`/repo/user/${userId}`);
    return response.data.repositories;
}

export const fetchSuggestedRepositories = async () => {
    const response = await api.get("/repo/all");
    return response.data
}