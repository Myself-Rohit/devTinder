import express from "express";
import { getPofile } from "../controllers/profile.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express();

router.get("/", verifyToken, getPofile);
export default router;
