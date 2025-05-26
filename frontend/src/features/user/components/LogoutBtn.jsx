import useAuth from "../hooks/useAuth";

function LogoutBtn() {
const { handleLogout } = useAuth();
    return (
        <button
            onClick={handleLogout}
            style={{ position: "fixed", bottom: "50px", right: "50px" }}
            id="logout"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;