import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			max: 110,
			min: 12,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ["male", "female", "other"],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
