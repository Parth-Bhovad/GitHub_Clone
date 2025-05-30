const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

dotenv.config();

yargs(hideBin(process.argv))
    .command("start", "Starts a new sever", {}, startServer)
    
    .demandCommand(1, "You need at least one command")
    .help().argv;

function startServer() {
    console.log("Server logic called");
    const app = express();
    const port = process.env.PORT || 3000;

    // app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.json());

    const mongoUri = process.env.MONGODB_URI;
    mongoose.connect(mongoUri)
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.error("Unable to connect :", error));

        app.use(cors({
            origin: process.env.NODE_ENV === "production" ? "https://github-clone-36vw.onrender.com" : "http://localhost:5173",
            credentials: true,
        }));
        console.log(process.env.NODE_ENV === "production");
        
    app.use("/", mainRouter);

    let user = "test"
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.NODE_ENV === "production" ? "https://github-clone-36vw.onrender.com" : "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    })

    io.on("connection", (socket) => {
        socket.on("joinRoom", (userID) => {
            user = userID;
            console.log("=====");
            console.log(user);
            console.log("=====");
            socket.join(userID);
        });
    });

    const db = mongoose.connection;

    db.once("open", async () => {
        console.log("CRUD operations called");
        //CRUD operations
    });

    httpServer.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    });
}