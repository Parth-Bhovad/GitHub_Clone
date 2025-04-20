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

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");
const {addRemoteRepo} = require("./controllers/addRemoteRepo");
const { error } = require("console");
const { argv } = require("process");

dotenv.config();

yargs(hideBin(process.argv))
    .command("start", "Starts a new sever", {}, startServer)
    .command("init", "Initialise a new repository", {}, initRepo)
    .command("add <file>", "Add a file to the repository",
        (yargs) => {
            yargs.positional("file", {
                describe: "The file to add",
                type: "string"
            });
        }, (argv) => {
            addRepo(argv.file);
        })
    .command("commit <message>", "Commit the current state of the repository", (yargs) => {
        yargs.positional("message", {
            describe: "The commit message",
            type: "string"
        });
    }, (argv) => {
        commitRepo(argv.message);
    })
    .command("push", "Push the current state of the repository to the remote", {}, pushRepo)
    .command("pull", "Pull the current state of the repository from the remote", {}, pullRepo)
    .command("revert <commitID>", "Revert to a specific commit", (yargs) => {
        yargs.positional("commitID", {
            describe: "Commit ID to revert to",
            type: "string",
        })
    }, (argv) => {
        revertRepo(argv.commitID)
    })
    .command("remote add origin <link>", "Add a remote repository to your local Git project", (yargs) => {
        yargs.positional("link", {
            describe:"link to add remote repo in local project",
            type:"string"
        })
    }, (argv) => {
        addRemoteRepo(argv.link)
    })
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