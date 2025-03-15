import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getFeed } from "../controllers/user.controllers.js";
const router = express.Router();

router.get("/feed", verifyToken, getFeed);
export default router;
