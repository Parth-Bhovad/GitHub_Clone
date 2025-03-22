import React from "react";
import Avatar from '../user/UserAvatar';
import "./RepoTable.css"
import "../../assets/colors.css";
import { Link } from "react-router-dom";

export default function RepositoryTable() {
    return (
        <div className="table">
            <div className="top">
                <Avatar />username
            </div>
            <Link to={"/repo/show/code"}>
                <div className="row">
                    <span>filename</span>
                    <span>Recent Commit</span>
                    <span>Time</span>
                </div>
            </Link>
            <div className="row">
                <span>filename</span>
                <span>Recent Commit</span>
                <span>Time</span>
            </div>
            <div className="row">
                <span>filename</span>
                <span>Recent Commit</span>
                <span>Time</span>
            </div>
            <div className="row">
                <span>filename</span>
                <span>Recent Commit</span>
                <span>Time</span>
            </div>
        </div>
    );
}
