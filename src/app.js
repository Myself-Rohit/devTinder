import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import authRouter from "../src/routes/auth.routes.js";
import profileRouter from "../src/routes/profile.routes.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 7001;

connectDB().then(() => {
	console.log("Database Connected!!");
	app.listen(port, () => {
		console.log(`app running at ${port}`);
	});
});

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
