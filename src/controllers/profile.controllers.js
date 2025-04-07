import User from "../models/user.js";
import cloudinary from "cloudinary";
import fs from "fs"
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
		const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
		fs.unlink((req.file.path),(err)=>{
			if(err) console.log(err)
				else console.log("file deleted!")
		})
		const user = await User.findByIdAndUpdate(
			{ _id: req.user._id },
			{
				firstName,
				lastName,
				age,
				gender,
				about,
			},
			{ new: true }
		);
		if (cloudinaryResponse) {
			user.photoUrl = cloudinaryResponse?.secure_url;
		}
		await user.save();
		const { password: pass, ...rest } = user._doc;
		res.status(200).send(rest);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
