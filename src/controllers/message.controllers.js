import Message from "../models/message.js";
import User from "../models/user.js";

export const getMessages = async (req, res) => {
	try {
		const senderId = req.user._id;
		const { receiverId } = req.params;
		const messages = await Message.find({
			$or: [
				{ senderId, receiverId },
				{ senderId: receiverId, receiverId: senderId },
			],
		});
		res.status(200).send(messages);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const sendMessage = async (req, res) => {
	try {
		const senderId = req.user._id;
		const { receiverId } = req.params;
		const { message } = req.body;
		const isUser = await User.findById(receiverId);
		if (!isUser) {
			throw new Error("User not found!");
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});
		await newMessage.save();
		res.status(201).send(newMessage);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
