import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { firstName, lastName, email, age, password } = req.body;

		if (!firstName || !lastName || !email || !age || !password) {
			throw new Error("All fields required!");
		}

		const isUser = await User.findOne({ email });
		if (isUser) {
			throw new Error("User already exist!");
		}

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);
		const user = new User({
			firstName,
			lastName,
			email,
			age,
			password: passwordHash,
		});

		await user.save();
		const token = generateToken(res, user._id);
		res.cookie("jwt_token", token, { secure: true, httpOnly: true });
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
