import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyToken = async (req, res, next) => {
	try {
		const token = req.cookies.jwt_token;
		if (!token) {
			throw new Error("Invalid token");
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { _id } = decoded;
		const user = await User.findOne({ _id });
		if (!user) {
			throw new Error("User not found");
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export default verifyToken;
