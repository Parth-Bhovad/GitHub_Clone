import React, { useEffect, useState } from "react";

import "./CreateRepo.css";

import Navbar from "../Navbar";

const CreateRepo = () => {
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
                                <input type="text" name="name" />
                            </div>
                        </div>

                    </div>
                    <p>Great repository names are short and memorable. Need inspiration? How about potential-octo-enigma ?</p>
                    <div className="description">
                    <label htmlFor="description">Description (optional)</label>
                    <input type="text" name="description" id="description" />
                    </div>
                    <hr />
                </div>

                <div className="d-3">
                    <input type="radio" name="visibility" id="public" />
                    <label htmlFor="public">Public</label>
                    <input type="radio" name="visibility" id="private" />
                    <label htmlFor="private">Private</label>

                    <hr />
                </div>

                <div className="d-4">
                    <p>You are creating a private repository in your personal account.</p>
                    <hr />
                </div>

                <button>Create repository</button>
            </div>
        </>
    );
}

export default CreateRepo;