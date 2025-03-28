import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
	getMessages,
	sendMessage,
} from "../controllers/message.controllers.js";
const router = express();

router.get("/:receiverId", verifyToken, getMessages);
router.post("/send/:receiverId", verifyToken, sendMessage);
export default router;
