import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../../styles/pages/createRepo.css";
import { useNavigate } from "react-router-dom";

import Navbar from "../layout/Navbar";

const CreateRepo = () => {
    const [reponame, setRepoName] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    // const [visibility, setVisibility] = useState("");
    const [selectedOption, setSelectedOption] = useState(false);
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsernamFromId = async (userId) => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/username/${userId}`
                );
                setUsername(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsernamFromId(userId);
    }, [username]);

    const handleUpload = async () => {
        try {
            const response = await axios.post("http://localhost:3000/repo/create", {
                reponame,
                description,
                visibility: selectedOption,
                owner: userId,
                username
            });

            navigate("/");

        } catch (error) {
            console.log("error during repo creating", error.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-1">
                    <h1>Create a new repository</h1>
                    <p>A repository contains all project files, including the revision history. Already have a project repository elsewhere? <a href="#">Import a repository.</a></p>
                    <hr />
                </div>

                <div className="d-2">
                    <p><i>Required fields are marked with an asterisk (*).</i></p>
                    <div className="owner-reponame">
                        <div className="owner-container">
                            <p>Owner*</p>
                            <div className="owner">
                                <img src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png" alt="" />
                                <p>Username</p>
                            </div>
                        </div>

                        <p className="slash">/</p>

                        <div className="reponame-container">
                            <p>Repository name*</p>
                            <div className="reponame">
                                <input type="text" name="name" value={reponame} onChange={(e) => setRepoName(e.target.value)} />
                            </div>
                        </div>

                    </div>
                    <p>Great repository names are short and memorable. Need inspiration? How about potential-octo-enigma ?</p>
                    <div className="description">
                        <label htmlFor="description">Description (optional)</label>
                        <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <hr />
                </div>

                <div className="d-3">
                    <input type="radio" name="visibility" id="public" value={"true"} checked={selectedOption === true} onChange={(e) => setSelectedOption(e.target.value === "true")} />
                    <label htmlFor="public">Public</label>
                    <input type="radio" name="visibility" id="private" value={"false"} checked={selectedOption === false} onChange={(e) => setSelectedOption(e.target.value === "true")} />
                    <label htmlFor="private">Private</label>

                    <hr />
                </div>

                <div className="d-4">
                    <p>You are creating a private repository in your personal account.</p>
                    <hr />
                </div>

                <button onClick={handleUpload}>Create repository</button>
            </div>
        </>
    );
}

export default CreateRepo;