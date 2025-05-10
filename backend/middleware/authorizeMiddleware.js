const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
function isLoggedIn(req, res, next) {
    console.log("isLoggedIn");
    
    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("DECODED:", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


function isOwner(req, res, next) {
    console.log("isOwner");

    let { id, username } = req.params;
    if (id) {
        if ( req.user._id.toString() !== id ) {
            console.log("You can't access another user's data. ID");
            
            return res.status(401).json({ message: "You can't access another user's data." });
        }
    }

    next();
}

module.exports = {isLoggedIn, isOwner};