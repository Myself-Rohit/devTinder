import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
	senderId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	status: {
		type: {
			type: String,
			enum: {
				values: ["interested", "ignored", "accepted", "rejected"],
				message: `{VALUES} is invalid status type`,
			},
		},
	},
});
connectionSchema.index({ senderId: 1, receiverId: 1 });
const Connection = mongoose.model("Connection", connectionSchema);
export default Connection;
