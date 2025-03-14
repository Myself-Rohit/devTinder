import express from "express";
import {
	getPofile,
	updateProfile,
} from "../controllers/profile.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express();

router.get("/", verifyToken, getPofile);
router.patch("/edit", verifyToken, updateProfile);
export default router;
