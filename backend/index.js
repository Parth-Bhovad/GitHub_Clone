import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import http from "http";
import mainRouter from "./routes/main.router.js";


const app = express();
const port = process.env.PORT || 3000;

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
console.log(process.env.NODE_ENV);

app.use("/", mainRouter);

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});