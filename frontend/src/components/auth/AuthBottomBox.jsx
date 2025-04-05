import { Link } from "react-router-dom";

export default function AuthBottomBox({text1, text2, link}) {
    return (
        <div className="pass-box">
            <p>{text1} <Link to={`/${link}`}>{text2}</Link></p>
        </div>
    );
}