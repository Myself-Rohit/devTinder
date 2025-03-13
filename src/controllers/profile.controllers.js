import User from "../models/user.js";

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
