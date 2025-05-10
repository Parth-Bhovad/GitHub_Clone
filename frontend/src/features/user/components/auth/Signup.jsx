//import Signup page components
//=======
import AuthLogoContainer from "./AuthLogoContainer";
import AuthHeading from "./AuthHeading";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthBottomBox from "./AuthBottomBox";
//=======

//import custom hook
import useAuth from "../../hooks/useAuth";

function Signup() {

    const { handleSignup, username, setUsername, email, setEmail, password, setPassword, loading } = useAuth();

    return (
        <main>
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
        </main>
    );
}

export default Signup;