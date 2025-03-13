import express from "express";
import { getPofile, updatePrfile } from "../controllers/profile.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express();

router.get("/", verifyToken, getPofile);
router.patch("/edit", verifyToken, updatePrfile);
export default router;
