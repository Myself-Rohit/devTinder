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

export const reviewConnection = async (req, res) => {
	try {
		const { status, connectionId } = req.params;
		const userId = req.user._id;

		const allowedStatus = ["accepted", "rejected"];
		if (!allowedStatus.includes(status)) {
			throw new Error("Invalid status type");
		}

		const connection = await Connection.findOne({
			_id: connectionId,
			receiverId: userId,
			status: "interested",
		});
		if (!connection) {
			throw new Error("Connection not found!");
		}
		connection.status = status;
		await connection.save();
		res.status(200).send(connection);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const getPendingConnections = async (req, res) => {
	try {
		const userId = req.user._id;

		const connection = await Connection.find({
			receiverId: userId,
			status: "interested",
		}).populate("senderId", "firstName lastName age gender about photoUrl");
		res.status(200).send(connection);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};

export const getAcceptedConnections = async (req, res) => {
	try {
		const userId = req.user._id;
		const connection = await Connection.find({
			status: "accepted",
			$or: [{ senderId: userId }, { receiverId: userId }],
		}).populate(
			"senderId receiverId",
			"firstName lastName age gender about photoUrl"
		);
		const users = connection.map((data) => {
			if (data.senderId._id == String(userId)) {
				return data.receiverId;
			}
			return data.senderId;
		});
		res.status(200).send(users);
	} catch (error) {
		res.status(400).send("ERROR : " + error.message);
	}
};
