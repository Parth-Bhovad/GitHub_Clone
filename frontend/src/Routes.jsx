import React, { useEffect } from "react";
import { useNavigate, useRoutes } from 'react-router-dom';

//Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepo from "./components/repo/CreateRepo";
import ShowRepo from "./components/repo/ShowRepo";
import ShowCode from "./components/repo/ShowCode"

//Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
            navigate("/auth");
        }

        if (userIdFromStorage && window.location.pathname == '/auth') {
            navigate("/");
        }

    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        {
            path: "/",
            element: <Dashboard />
        },
        {
            path: "/auth",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/repo/create",
            element: <CreateRepo />
        },
        {
            path: "/repo/show",
            element: <ShowRepo />
        },
        {
            path: "/repo/show/code",
            element: <ShowCode />
        }
    ]);

    return element;
}

export default ProjectRoutes;