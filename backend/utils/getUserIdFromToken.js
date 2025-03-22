const jwt = require("jsonwebtoken");
const express = require("express");
function getUserIdFromToken(req) {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Get token from "Bearer <token>"
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode token
        return decoded.userId; // Extract userId from payload
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null;
    }
}

module.exports = getUserIdFromToken;