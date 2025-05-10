import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/layouts/navbar.css";
//importing axios instance
import api from '../../axiosInstance/axios';

const Navbar = () => {
const [username, setUsername] = useState("");

    const userId = localStorage.getItem("userId");
    
    useEffect(() => {
        const fetchUsernamFromId = async (userId) => {
            try {
                const response = await api.get(
                    `/username/${userId}`,
                  );
                setUsername(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsernamFromId(userId);
    }, [username]);
    return (
        <nav>
            <Link to="/" style={{textDecoration:"none"}}>
                <div className="logoDiv">
                    <img src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" />
                    <h3>GitHub</h3>
                </div>
            </Link>

            <div>
                <Link to="/repo/create" style={{textDecoration:"none"}}>
                    <p>Create a Repository</p>
                </Link>

                <Link to={`/profile/${username}`} style={{textDecoration:"none"}}>
                    <p>Profile</p>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;