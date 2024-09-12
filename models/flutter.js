import mongoose from "mongoose";

const flutterSchema = new mongoose.Schema({
	postedAt: { type: Date, required: true },
	body: { type: String, required: true },
	likes: [{ type: String }],
	user: { type: Object, required: true },

});

const Flutter =
	mongoose.models.Flutter || mongoose.model("Flutter", flutterSchema);
export default Flutter;
