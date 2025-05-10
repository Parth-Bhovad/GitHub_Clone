//importing axios instance
import api from '../../../axiosInstance/axios';

export const createRepo = async (reponame, description, visibility, userId, username) => {
    const response = await api.post("/repo/create", {
        reponame,
        description,
        visibility,
        owner: userId,
        username
    },
    );

    
}