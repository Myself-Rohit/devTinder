import User from "../models/user.js";

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

		const user = new User({
			firstName,
			lastName,
			email,
			age,
			password,
		});
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
