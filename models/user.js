import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	id: { type: String, required: true },
	email: { type: String, required: true },
	nickname: { type: String, required: true },
	name: { type: String, required: true },
	picture: { type: String, required: true },
	data: {
		sub: { type: String, required: true },
	},
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
