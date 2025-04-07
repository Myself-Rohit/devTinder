import express from "express";
import {
	getPofile,
	updateProfile,
} from "../controllers/profile.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import multer from "multer";
const router = express();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "src/uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage });

router.get("/", verifyToken, getPofile);
router.patch("/edit", verifyToken, upload.single("photoUrl"), updateProfile);
export default router;
