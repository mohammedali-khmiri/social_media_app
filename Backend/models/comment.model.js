const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		desc: {
			type: String,
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		likes: {
			type: Array,
			default: [],
		},
		postId: {
			type: mongoose.Types.ObjectId,
			ref: "Post",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
