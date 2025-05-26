//importing components
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import LogoutBtn from "./LogoutBtn";
import UserProfileSection from "./UserProfileSection";

// importing css
import "../styles/profile.css";
function Profile() {
    return (
        <>
            <UnderlineNav aria-label="Repository">
                <UnderlineNav.Item
                    aria-current="page"
                    icon={BookIcon}
                    sx={{
                        backgroundColor: "transparent",
                        color: "white",
                        "&:hover": {
                            textDecoration: "underline",
                            color: "white",
                        },
                    }}
                >
                    Overview
                </UnderlineNav.Item>

                <UnderlineNav.Item
                    onClick={() => navigate("/repo")}
                    icon={RepoIcon}
                    sx={{
                        backgroundColor: "transparent",
                        color: "whitesmoke",
                        "&:hover": {
                            textDecoration: "underline",
                            color: "white",
                        },
                    }}
                >
                    Starred Repositories
                </UnderlineNav.Item>
            </UnderlineNav>

        <LogoutBtn />

            <div className="profile-page-wrapper">
                <UserProfileSection />

                <div className="heat-map-section">
                    <HeatMapProfile />
                </div>
            </div>
        </>
    );
}

export default Profile;