import { Link } from "react-router-dom";
import "../../styles/layouts/navbar.css";

//importing custom hook
import useFetchUsernameFromId from "../../features/user/hooks/useFetchUsernameFromId"

//import authContext
import { useAuthContext } from "../../features/user/context/authContext"

const Navbar = () => {
    const { currentUser } = useAuthContext();
    const { username } = useFetchUsernameFromId(currentUser);

    return (
        <nav>
            {currentUser ? <>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="logoDiv">
                        <img src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" />
                        <h3>GitHub</h3>
                    </div>
                </Link>

                <div>
                    <Link to="/repo/create" style={{ textDecoration: "none" }}>
                        <p>Create a Repository</p>
                    </Link>

                    <Link to={`/profile/${username}`} style={{ textDecoration: "none" }}>
                        <p>Profile</p>
                    </Link>
                </div>
            </>
                :
                <>
                    <div className="logoDiv">
                        <img src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" />
                        <h3>GitHub</h3>
                    </div>
                </>
            }
        </nav>
    )
}

export default Navbar;