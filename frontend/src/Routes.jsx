import { useEffect } from "react";
import { useNavigate, useRoutes } from 'react-router-dom';

//Pages List
import Dashboard from "./features/dashboard/views/DashboardPage";
import Profile from "./features/user/views/ProfilePage";
import Login from "./features/user/views/auth/LoginPage";
import Signup from "./features/user/views/auth/SignupPage";
import CreateRepo from "./features/repository/views/CreateRepoPage";
import RepositoryPage from "./features/repository/views/RepositoryPage";
// import ShowCode from "./components/repo/ShowCode"

//Auth Context
import { useAuthContext } from "./features/user/context/authContext";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuthContext();
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
            path: "/profile/:username",
            element: <Profile />
        },
        {
            path: "/repo/create",
            element: <CreateRepo />
        },
        {
            path: "/:username/:reponame/*",
            element: <RepositoryPage />
        },
        // {
        //     path: "/:username/:reponame/show",
        //     element: <ShowCode />
        // }
    ]);

    return element;
}

export default ProjectRoutes;