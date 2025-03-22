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

export const updateProfile = async (req, res) => {
	try {
		const { firstName, lastName, age, gender, about, photoUrl } = req.body;
		if (!firstName || !lastName || !age || !gender || !about || !photoUrl) {
			throw new Error("All fields are required!");
		}
		const user = await User.findByIdAndUpdate(
			{ _id: req.user._id },
			{
				firstName,
				lastName,
				age,
				gender,
				about,
				photoUrl,
			}
		);
		await user.save();
		const { password: pass, ...rest } = user._doc;
		res.status(200).send(rest);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
