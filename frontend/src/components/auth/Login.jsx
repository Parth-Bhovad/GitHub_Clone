import React, { useState, useEffect } from 'react';
import { useAuth } from "../../authContext";

import axios from 'axios';
import { Link } from "react-router-dom";

import { PageHeader } from '@primer/react';
import { Box, Button } from "@primer/react";
import "../../styles/pages/auth.css"

import logo from "../../assets/github-mark-white.svg"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, setCurrentUser } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/login", {
                email: email,
                password: password,
            }, { withCredentials: true });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser(res.data.userId);
            setLoading(false);

            window.location.href = "/";

        } catch (error) {
            console.error(error);
            alert("Signup failed!");
            setLoading(false);
        };
    };

    return (
        <div className="login-wrapper">
            <div className="login-logo-container">
                <img className="logo-login" src={logo} alt="Logo" />
            </div>

            <div className="login-box-wrapper">
                <div className="login-heading">
                    <Box>
                        <PageHeader>
                            <PageHeader.TitleArea varient="large">
                                <PageHeader.Title>Sign In</PageHeader.Title>
                            </PageHeader.TitleArea>
                        </PageHeader>
                    </Box>
                </div>

                <div className="login-box">
                    <div>
                        <label className="label">Email address</label>
                        <input
                            autoComplete="off"
                            name="Email"
                            id="Email"
                            className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="div">
                        <label className="label">Password</label>
                        <input
                            autoComplete="off"
                            name="Password"
                            id="Password"
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        variant="primary"
                        className="login-btn"
                        disabled={loading}
                        onClick={handleLogin}>
                        {loading ? "loading" : "Login"}
                    </Button>
                </div>
                <div className="pass-box">
                    <p>New to GitHub? <Link to="/signup">Create an account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;