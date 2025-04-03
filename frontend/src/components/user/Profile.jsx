import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
import { useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });
  const [isFollow, setIsFollow] = useState();
  const { setCurrentUser } = useAuth();

  const {username} = useParams();

  const [file, setFile] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const userId = localStorage.getItem("userId");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("profileUrl", file);

    try {
      let response = await axios.post(`http://localhost:3000/upload/${username}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      console.log("File uploaded:", response.data.profileUrl);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleFollow = async () => {
    let response = await axios.patch(`http://localhost:3000/following/${userDetails._id}`,{}, { withCredentials: true });
    console.log(response);
    setIsFollow(response.data.isFollow);
  }


  useEffect(() => {
    const fetchUserDetails = async () => {
      // const userId = localStorage.getItem("userId");

      if (username) {
        try {
          const response = await axios.get(
            `http://localhost:3000/userProfile/${username}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchUserProfileUrl = async () => {
      // const userId = localStorage.getItem("userId");

      if (username) {
        try {
          const response = await axios.get(`http://localhost:3000/profileUrl/${username}`);

          setProfileUrl(response.data);
        } catch (error) {
          console.error("Cannot fetch user profileUrl: ", error);
        }
      }
    }

    fetchUserProfileUrl()
  }, [profileUrl])

  return (
    <>
      <Navbar />
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

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);

          window.location.href = "/auth";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image">
            {profileUrl ? <img src={profileUrl} alt="profile" /> : <p>No profileUrl</p>}
          </div>
            <label htmlFor="profile"></label>
            <input type="file" id="profile" name="profileUrl" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

          <div className="name">
            <h1>{userDetails.username}</h1>
          </div>

          <button className="follow-btn" onClick={handleFollow}>{isFollow ? "Unfollow": "Follow"}</button>

          <div className="follower">
            <p>10 Follower</p>
            <p>.</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;