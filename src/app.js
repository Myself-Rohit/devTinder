import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import authRouter from "../src/routes/auth.routes.js";
import profileRouter from "../src/routes/profile.routes.js";
import connectionRouter from "../src/routes/connection.routes.js";
import userRouter from "../src/routes/user.routes.js";
import messageRouter from "../src/routes/message.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import initializeSocket from "./socket.js";
const app = express();
dotenv.config();
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 7001;

const server = createServer(app);
initializeSocket(server);
connectDB().then(() => {
	console.log("Database Connected!!");
	server.listen(port, () => {
		console.log(`app running at ${port}`);
	});
});

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/connection", connectionRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", messageRouter);
