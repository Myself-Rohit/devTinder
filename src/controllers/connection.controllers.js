import Connection from "../models/connection.js";
import User from "../models/user.js";

export const createConnection = async (req, res) => {
	try {
		const senderId = req.user._id;
		const receiverId = req.params.receiverId;
		const status = req.params.status;

		if (receiverId == String(senderId)) {
			throw new Error("Invalid request");
		}
		const allowedStatus = ["interested", "ignored"];
		if (!allowedStatus.includes(status)) {
			throw new Error("status is invalid");
		}
		const isUser = await User.findById(receiverId);
		if (!isUser) {
			throw new Error("User not found!");
		}
		const isConnection = await Connection.findOne({
			$or: [
				{ senderId, receiverId },
				{ senderId: receiverId, receiverId: senderId },
			],
		});
		if (isConnection) {
			throw new Error("Connection already exist");
		}
		const newConnection = await new Connection({
			senderId,
			receiverId,
			status,
		});
		await newConnection.save();
		res.status(201).send(newConnection);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
