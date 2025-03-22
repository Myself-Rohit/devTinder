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
		},
		gender: {
			type: String,
			enum: {
				values: ["male", "female", "other"],
				message: `{VALUES} is invalid gender`,
			},
		},
		photoUrl: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
