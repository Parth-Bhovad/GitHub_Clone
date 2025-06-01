import jwt from 'jsonwebtoken';

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

function isOwner(req, res, next) {
    let { id, username } = req.params;
    if (id) {
        if ( req.user._id.toString() !== id ) {
            return res.status(401).json({ message: "You can't access another user's data." });
        }
    }

    next();
}

export { isLoggedIn, isOwner };