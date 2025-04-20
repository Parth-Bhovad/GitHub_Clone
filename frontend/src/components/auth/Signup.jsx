import React, { useState } from 'react';

//importing axios instance
import api from '../../api/axios';

import "../../styles/pages/auth.css"

//Importing Auth Components
import AuthHeading from './AuthHeading';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import AuthLogoContainer from './AuthLogoContainer';
import AuthBottomBox from './AuthBottomBox';

import { useAuth } from '../../authContext';
const Signup = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setCurrentUser } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/signup", {
                email: email,
                password: password,
                username: username,
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
                <AuthHeading title={"Sign Up"} />

                <div className="login-box">
                    <AuthInput label={"Username"} type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} />
                    <AuthInput label={"Email Address"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <AuthInput label={"Password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />

                    <AuthButton disabled={loading} onClick={handleSignup} value={loading ? "loading" : "SignUp"} />
                </div>
                <AuthBottomBox text1={"Already have an account?"} text2={"Login"} link={"auth"} />
            </div>
        </div>
    );
};

export default Signup;