import Connection from "../models/connection.js";
import User from "../models/user.js";

export const getFeed = async (req, res) => {
	try {
		const userId = req.user._id;
		const connections = await Connection.find({
			$or: [{ senderId: userId }, { receiverId: userId }],
		}).select("senderId receiverId");

		const hideUsers = new Set();
		connections.forEach((data) => {
			hideUsers.add(data.senderId.toString());
			hideUsers.add(data.receiverId.toString());
		});

		const users = await User.find({
			$and: [
				{ _id: { $nin: Array.from(hideUsers) } },
				{ _id: { $ne: userId } },
			],
		}).select("firstName lastName age gender about");
		res.status(200).send(users);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
