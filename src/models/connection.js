import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: {
				values: ["interested", "ignored", "accepted", "rejected"],
				message: `{VALUES} is invalid status type`,
			},
		},
	},
	{ timestamps: true }
);
connectionSchema.index({ senderId: 1, receiverId: 1 });
const Connection = mongoose.model("Connection", connectionSchema);
export default Connection;
