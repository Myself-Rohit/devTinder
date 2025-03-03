import jwt from "jsonwebtoken";
export const generateToken = async (res, userId) => {
	try {
		const token = await jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
			expiresIn: "15d",
		});
		return token;
	} catch (error) {
		res.send("ERROR : " + error.message);
	}
};
