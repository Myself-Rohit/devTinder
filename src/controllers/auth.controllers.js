import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { firstName, lastName, gender, email, password } = req.body;

		if (!firstName || !lastName || !email || !password || !gender) {
			throw new Error("All fields are required!");
		}

		const isUser = await User.findOne({ email });
		if (isUser) {
			throw new Error("User already exist!");
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const malePic = `https://avatar.iran.liara.run/public/boy?username=${
			firstName + lastName
		}`;
		const femalePic = `https://avatar.iran.liara.run/public/girl?username=${
			firstName + lastName
		}`;
		let profilePic =
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
		if (gender !== "other") {
			profilePic = gender == "male" ? malePic : femalePic;
		}

		const user = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			gender,
			photoUrl: profilePic,
		});

		await user.save();
		const { password: pass, ...rest } = user._doc;
		const token = await generateToken(res, user._id);
		res.cookie("jwt_token", token, { secure: true, httpOnly: true });
		res.status(201).send(rest);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw new Error("All fields are required!");
		}
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("User not found");
		}

		const comparePassword = await bcrypt.compare(password, user.password);
		if (!comparePassword) {
			throw new Error("Invalid credentials!");
		}
		const { password: pass, ...rest } = user._doc;
		const token = await generateToken(res, user._id);
		res.cookie("jwt_token", token, { secure: true, httpOnly: true });
		res.status(200).send(rest);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const signout = async (req, res) => {
	try {
		res.cookie("jwt_token", null, { expiresIn: Date.now() });
		res.status(200).send("Logout successfully!");
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
