import React, { useState } from 'react';
import { useAuth } from "../../authContext";

//importing axios instance
import api from '../../api/axios';

//Importing Auth Components
import AuthHeading from './AuthHeading';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import AuthLogoContainer from './AuthLogoContainer';
import AuthBottomBox from './AuthBottomBox';

import "../../styles/pages/auth.css"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, setCurrentUser } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/login", {
                email: email,
                password: password,
            });

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
            <AuthLogoContainer />

            <div className="login-box-wrapper">
                <AuthHeading title={"Sign In"} />

                <div className="login-box">
                    <AuthInput label={"Email Address"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <AuthInput label={"Password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />

                    <AuthButton disabled={loading} onClick={handleLogin} value={loading ? "loading" : "Login"} />
                </div>
                <AuthBottomBox text1={"New to GitHub?"} text2={"Create an account"} link={"signup"} />
            </div>
        </div>
    );
};

export default Login;