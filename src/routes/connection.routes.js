import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
	createConnection,
	getPendingConnections,
	reviewConnection,
} from "../controllers/connection.controllers.js";
const router = express.Router();

router.post("/send/:status/:receiverId", verifyToken, createConnection);
router.post("/response/:status/:connectionId", verifyToken, reviewConnection);
router.get("/pending", verifyToken, getPendingConnections);
export default router;
