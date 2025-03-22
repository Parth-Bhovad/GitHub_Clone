import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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

                <Link to="/Profile" style={{textDecoration:"none"}}>
                    <p>Profile</p>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;