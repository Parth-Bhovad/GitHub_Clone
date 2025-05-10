//import custom styling
import "../../styles/auth.css"

//import LoginPageComponents
//=======
import AuthLogoContainer from "./AuthLogoContainer";
import AuthHeading from "./AuthHeading";
import AuthInput from "./AuthInput";
import AuthBottomBox from "./AuthBottomBox";
import AuthButton from "./AuthButton"
//=======

//custom hook
import useAuth from "../../hooks/useAuth";

function Login() {

    const { handleLogin, email, setEmail, password, setPassword, loading } = useAuth();

    return (
        <main>
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
        </main>
    );
}

export default Login;