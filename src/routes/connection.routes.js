import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
	createConnection,
	reviewConnection,
} from "../controllers/connection.controllers.js";
const router = express.Router();

router.post("/send/:status/:receiverId", verifyToken, createConnection);
router.post("/response/:status/:connectionId", verifyToken, reviewConnection);
export default router;
