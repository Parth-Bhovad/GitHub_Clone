import React, { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Navbar = () => {
const [username, setUsername] = useState("");

    const userId = localStorage.getItem("userId");
    
    useEffect(() => {
        const fetchUsernamFromId = async (userId) => {
            const response = await axios.get(
                `http://localhost:3000/username/${userId}`
              );
            setUsername(response.data);
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

                <Link to={`/Profile/${username}`} style={{textDecoration:"none"}}>
                    <p>Profile</p>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;