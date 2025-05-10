import { useState } from "react";
import { useNavigate } from 'react-router-dom';

//import APIs
import { signup, login, logout } from "../api/authAPI"

//import context
import { useAuthContext } from "../context/authContext";

function useAuth() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCurrentUser } = useAuthContext();

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const signupUser = await signup(email, password, username);

            localStorage.setItem("token", signupUser.token);
            localStorage.setItem("userId", signupUser.userId);

            setCurrentUser(signupUser.userId);
            setLoading(false);

            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Signup failed!");
            setLoading(false);
        };
    }

    const handleLogin = async () => {
        try {
            const loggedInUser = await login(email, password);

            localStorage.setItem("token", loggedInUser.token);
            localStorage.setItem("userId", loggedInUser.userId);

            setCurrentUser(loggedInUser.userId);
            setLoading(false);

            navigate("/");

        } catch (error) {
            console.error(error);
            alert("Signup failed!");
            setLoading(false);
        };
    };

    const handleLogout = async () => {
        console.log("logout");
        await logout();

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setCurrentUser(null);

        navigate("/auth");
    }

    return (
        { handleSignup, handleLogin, handleLogout, email, setEmail, username, setUsername, password, setPassword, loading, setLoading }
    );
}

export default useAuth;