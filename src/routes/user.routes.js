import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getFeed, getUser } from "../controllers/user.controllers.js";
const router = express.Router();

router.get("/feed", verifyToken, getFeed);
router.get("/get/:userId", verifyToken, getUser);
export default router;
