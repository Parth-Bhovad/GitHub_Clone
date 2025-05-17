//importing axios instance
import api from "../../../axiosInstance/axios"

export const fetchBucketFilePaths = async (reponame) => {
    try {
        let response = await api.get(`/repo/allFilesPath/${reponame}`,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching file paths:", error);
        return [];
    }
}

export const fetchFileExtension = async (path) => {
    const response = await api.get("/repo/getFileExt", {
        params: { filePath: path },
    });

    return response.data.extension;
}

export const fetchPublicUrl = async (path) => {
    const response = await api.get(`/repo/publicUrl/${path}`);
    return response.data;
}

export const fetchRepositoryByName = async (reponame) => {
    const response = await api.get(`/repo/name/${reponame}`);
    return response.data;
}