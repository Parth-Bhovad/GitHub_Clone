import api from "../../../axiosInstance/axios"

export const signup = async (email, password, username) => {
    const res = await api.post("/signup", {
        email,
        password,
        username,
    });
    return res.data;
}

export const login = async (email, password) => {
    const res = await api.post("/login", {
        email: email,
        password: password,
    });

    return res.data;
}

export const logout = async () => {
    const response = await api.post("/logout");
}