import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
    if (!client) {
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    await client.connect();
}

export const getAllUsers = async (req, res) => {
    try {
        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");

        const users = await userCollection.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error("Error during fetching: ", error.message);
        res.status(500).send("Server error");
    }
};

export const signup = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "user already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            password: hashedPassword,
            email,
            repositories: [],
            followers: [],
            following: [],
            starRepos: [],
        };

        const result = await userCollection.insertOne(newUser);

        const token = jwt.sign({ id: result.insertedId },
            process.env.JWT_SECRET_KEY
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax"
        });
        res.json({ token, userId: result.insertedId });

    } catch (error) {
        console.error("Error during signup: ", error);
        res.status(500).send("Server error");
    }
};

export const uploadProfileUrl = async (req, res) => {
    await connectClient();
    const db = client.db("GitHubClone");
    const userCollection = db.collection("users");
    const username = req.params.username;

    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await userCollection.updateOne(
        { username },
        { $set: { profileUrl: file.path } }
    );
    res.json({ result });
};

export const getProfileUrl = async (req, res) => {
    await connectClient();
    const db = client.db("GitHubClone");
    const userCollection = db.collection("users");
    const username = req.params.username;

    try {
        const user = await userCollection.find({ username }).next();
        const profileUrl = user.profileUrl;
        res.json(profileUrl);
    } catch (error) {
        console.error("Error during getting user profileUrl: ", error.message);
        res.status(500).send("Server error");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credential" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credential" });
        }

        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET_KEY,
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax"
        });

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error("Error during login:", error.message);
    }
};

export const getUserProfile = async (req, res) => {
    const username = req.params.username;
    try {
        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({
            username
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error during fetching: ", error.message);
        res.status(500).send("Server error");
    }
};

export const updateUserProfile = async (req, res) => {
    await connectClient();
    const db = client.db("GitHubClone");
    const userCollection = db.collection("users");
    const currentID = req.params.id;
    const { email, password } = req.body;
    try {
        let updateFields = {};
        if (email) {
            updateFields = { email };
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }
        const result = await userCollection.findOneAndUpdate({
            _id: new ObjectId(currentID),
        },
            { $set: updateFields },
            { returnDocument: "after" }
        );
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.send(result);
    } catch (error) {
        console.error("Error during updating: ", error.message);
        res.status(500).send("Server error");
    }
};

export const deleteUserProfile = async (req, res) => {
    try {
        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");
        const currentID = req.params.id;

        const deletedUser = await userCollection.deleteOne({
            _id: new ObjectId(currentID),
        });

        if (deletedUser.deleteCount == 0) {
            res.status(404).json("User not found");
        }

        res.json("user deleted");
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUsername = async (req, res) => {
    try {
        const userId = req.params.id;

        const userObjectId = new ObjectId(userId);

        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({
            _id: userObjectId,
        });

        res.json(user.username);
    } catch (error) {
        console.log(error);
    }
};

export const following = async (req, res) => {
    try {
        let token = req.cookies.token;

        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let userId = decoded.id;
        let userObjectId = new ObjectId(userId);

        const targetUserId = req.params.id;
        const targetUserObjectId = new ObjectId(targetUserId);

        if (!userId || !targetUserId) {
            return res.status(400).json({ message: "Both userId and targetUserId are required." });
        }

        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");

        let targetUser = await userCollection.findOne({ _id: targetUserObjectId });
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found." });
        }
        let isFollower = targetUser.followers.some(followersId => followersId.toString() === userObjectId.toString());
        const targetUserUpdateQuery = isFollower ? { $pull: { followers: userObjectId } } : { $addToSet: { followers: userObjectId } };

        let updatedTargetUser = await userCollection.findOneAndUpdate({ _id: targetUserObjectId }, targetUserUpdateQuery, { returnDocument: "after" });

        const user = await userCollection.findOne({ _id: userObjectId });
        if (!user) {
            return res.status(404).json({ message: "Target user not found." });
        }
        let isFollowing = user.following.some(followingId => followingId.toString() === targetUserObjectId.toString());
        let userUpdateQuery = isFollowing ? { $pull: { following: targetUserObjectId } } : { $addToSet: { following: targetUserObjectId } };
        const updatedUser = await userCollection.findOneAndUpdate({ _id: userObjectId }, userUpdateQuery, { returnDocument: "after" });

        res.json({
            message: isFollower ? "Unfollowed successfully" : "Followed successfully",
            isFollow: isFollower ? false : true,
            updatedTargetUser
        });
    } catch (error) {
        console.log(error);
    }
};

export const isFollowing = async (req, res) => {
    try {
        let token = req.cookies.token;

        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let userId = decoded.id;
        let userObjectId = new ObjectId(userId);

        const targetUserId = req.params.id;
        const targetUserObjectId = new ObjectId(targetUserId);

        if (!userId || !targetUserId) {
            return res.status(400).json({ message: "Both userId and targetUserId are required." });
        }

        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({ _id: userObjectId });

        let isFollowing = user.following?.some(followingId => followingId.toString() === targetUserObjectId.toString());

        res.json({ isFollowing });
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax"
    });
    res.status(200).json({ success: true });
};