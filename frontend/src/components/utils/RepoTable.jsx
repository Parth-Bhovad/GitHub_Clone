import React,{useState} from "react";
import Avatar from '../user/UserAvatar';
import "./RepoTable.css"
import "../../assets/colors.css";
import { Link } from "react-router-dom";

export default function RepositoryTable({rows, reponame, username}) {
    return (
        <div className="table">
            <div className="top">
                <Avatar />username
            </div>
            {Object.keys(rows).map((key) => (
                <Link to={`/${username}/${reponame}/show`}>
                <div className="row">
                    <span>{key}</span>
                    <span>Recent Commit</span>
                    <span>Time</span>
                </div>
            </Link>
            ))}
        </div>
    );
}
