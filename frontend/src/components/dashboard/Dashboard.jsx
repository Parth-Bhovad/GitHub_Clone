import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
const Dashboard = () => {

    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log(userId);


        const fetchRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/repo/user/${userId}`);

                const data = await response.json();
                setRepositories(data.repositories);
            } catch (error) {
                console.error("Error while fetching repositories", error);
            }
        };

        const fetchSuggestedRepositories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/repo/all`);

                const data = await response.json();
                setSuggestedRepositories(data);
                console.log(data);
                console.log(suggestedRepositories);
            } catch (error) {
                console.error("Error while fetching repositories", error);
            }
        };

        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);

    useEffect(() => {
        if (searchQuery == "") {
            setSearchResults([]);
        } else {
            const filteredRepo = repositories.filter((repo) => repo.name.toLowerCase().includes(searchQuery.toLowerCase()));
            console.log(filteredRepo);
            setSearchResults(filteredRepo);
        }
    }, [searchQuery, repositories]);

    return (
        <>
            <Navbar />
            <section id="dashboard">
                <aside className="leftAside">
                    <h3>Suggested Repositories</h3>
                    {suggestedRepositories.map((repo) => {
                        return (
                            <div key={repo._id}>
                                <p>{`${repo.username}/${repo.reponame}`}</p>
                            </div>
                        )
                    })}
                </aside>
                <main>
                    <h3>Your Repositories</h3>
                    <div id="search">
                        <input type="text" value={searchQuery} placeholder="Find a repository..." onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    {searchResults.length == 0 ? repositories.map((repo) => {
                        return (
                            <>
                                <Link to={`/${repo.username}/${repo.reponame}`} style={{ textDecoration: "none" }}>
                                    <div key={repo._id} className="repoContainer">
                                        <h2>{repo.reponame}</h2>
                                        <p>{repo.description}</p>
                                    </div>
                                </Link>
                            </>
                        );
                    }) : searchResults.map((repo) => {
                        return (
                            <Link to="/repo/show" style={{ textDecoration: "none" }}>
                                <div key={repo._id} className="repoContainer">
                                    <h4>{repo.name}</h4>
                                    <p>{repo.description}</p>
                                </div>
                            </Link>
                        );
                    })}
                </main>
                <aside className="rightAside">
                    <h3>Upcoming Events</h3>
                    <ul>
                        <li>
                            <p>Tech Conference - Dec 15</p>
                            <p>Developer MeetUp - Jan 15</p>
                            <p>React Summit - Jan 30</p>
                        </li>
                    </ul>
                </aside>
            </section>
        </>
    );
}

export default Dashboard;