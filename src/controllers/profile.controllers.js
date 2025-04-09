import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

export const getPofile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			throw new Error("User not found!");
		}
		const { password: pass, ...rest } = user._doc;
		res.status(200).send(rest);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { firstName, lastName, age, gender, about } = req.body;
		if (!firstName || !lastName || !age || !gender || !about) {
			throw new Error("All fields are required!");
		}
		let cloudinaryResponse = "";
		if (req.file) {
			cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
			fs.unlink(req.file.path, (err) => {
				if (err) console.log(err);
				else console.log("file deleted!");
			});
		}

		const user = await User.findByIdAndUpdate(
			{ _id: req.user._id },
			{
				firstName,
				lastName,
				age,
				gender,
				about,
				photoUrl: cloudinaryResponse?.secure_url
					? cloudinaryResponse?.secure_url
					: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			},
			{ new: true }
		);

		await user.save();
		const { password: pass, ...rest } = user._doc;
		res.status(200).send(rest);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
