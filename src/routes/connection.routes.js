import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createConnection } from "../controllers/connection.controllers.js";
const router = express.Router();

router.post("/send/:status/:receiverId", verifyToken, createConnection);
export default router;
