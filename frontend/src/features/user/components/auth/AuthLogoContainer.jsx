import logo from "../../../../assets/github-mark-white.svg"

export default function AuthLogoContainer(){
    return (
        <div className="login-logo-container">
            <img className="logo-login" src={logo} alt="Logo" />
        </div>
    );
}