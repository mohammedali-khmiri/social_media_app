const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
	{
		img: {
			type: String,
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Stories", storySchema);
