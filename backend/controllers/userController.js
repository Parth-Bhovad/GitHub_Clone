const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ReturnDocument } = require("mongodb")
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;
const fs = require("fs").promises;
const path = require("path");

dotenv.config();
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

const getAllUsers = async (req, res) => {
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

const signup = async (req, res) => {
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
            followdUsers: [],
            starRepos: [],
        };

        const result = await userCollection.insertOne(newUser);

        const token = jwt.sign({ id: result.insertId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ token, userId: result.insertId });

    } catch (error) {
        console.error("Error during signup: ", error.message);
        res.status(500).send("Server error");
    }
};

const uploadProfileUrl = async (req, res) => {
    await connectClient();
    const db = client.db("GitHubClone");
    const userCollection = db.collection("users");
    const userId = req.params.id;
    const objectId = new ObjectId(userId);

    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await userCollection.updateOne(
        { _id: objectId }, 
        { $set: { profileUrl: file.path } } // Assuming you want to store file path
    );
    console.log("uploading...");
    console.log(file.path);
    res.json({result});
}

const getProfileUrl = async (req, res) => {
    await connectClient();
    const db = client.db("GitHubClone");
    const userCollection = db.collection("users");
    const userId = req.params.id;
    console.log(userId);
    
    try {
        const user = await userCollection.find({_id:new ObjectId(userId)}).next();
        console.log(user);
        const profileUrl = user.profileUrl;
        console.log(profileUrl);
        res.json(profileUrl);
    } catch (error) {
        console.error("Error during getting user profileUrl: ", error.message);
        res.status(500).send("Server error");
    }
}

const login = async (req, res) => {
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

        // Correctly resolve path
        const configPath = path.resolve(process.cwd(), "config", "userConfig.json");

        // Save userId to config file (correctly using await)
        await fs.writeFile(configPath, JSON.stringify({ userId: user._id }));

        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

    res.cookie("token", token);

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error("Error during login:", error.message);
    }
};

const getUserProfile = async (req, res) => {
    const currentID = req.params.id
    try {
        await connectClient();
        const db = client.db("GitHubClone");
        const userCollection = db.collection("users");

        const user = await userCollection.findOne({
            _id: new ObjectId(currentID)
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

const updateUserProfile = async (req, res) => {
    await connectClient();
    const db = client.db("GitHubClone");
    const userCollection = db.collection("users");
    const currentID = req.params.id;
    const { email, password } = req.body;
    try {
        let updateFields = { email };
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

const deleteUserProfile = async (req, res) => {
    await connectClient();
    const db = client.db("GitHubClone");
    const userCollection = db.collection("users");
    const currentID = req.params.id;

    const deletedUser = await userCollection.deleteOne({
        _id: new ObjectId(currentID),
    });

    if (deletedUser.deleteCount == 0) {
        res.status(404).json("User not found")
    }

    res.json("user deleted");
};

module.exports = {
    getAllUsers,
    signup,
    uploadProfileUrl,
    getProfileUrl,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
};