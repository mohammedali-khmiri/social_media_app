const Comment = require("../models/comment.model");
const User = require("../models/user.model");

//CREATE A Comment
const createComment = async (req, res) => {
	const newComment = new Comment({
		desc: req.body.desc,
		postId: req.params.id,
		author: req.verifiedUser._id,
	});
	try {
		const savedComment = await newComment.save();
		res.status(200).json(savedComment);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

//UPDATE A Comment
const updateComment = async (req, res) => {
	const idComment = req.comment.id;

	const comment = await Comment.findById(idComment);

	await comment.updateOne({ $set: req.body });
	res.status(200).json("Comment has been updated");
};

//DELETE A Comment
const deleteComment = async (req, res) => {
	const idComment = req.comment.id;
	const comment = await Comment.findById(idComment);

	if (comment.author === req.verifiedUser._id) {
		await comment.deleteOne();
		res.status(200).json("Comment has been deleted");
	} else {
		res.status(500).json("You can delete only your Comment");
	}
};

//LIKE / DISLIKE A Comment
const likeComment = async (req, res) => {
	const idComment = req.comment.id;
	const currentUserId = req.verifiedUser._id;
	try {
		const comment = await Comment.findById(idComment);
		if (!comment.likes.includes(currentUserId)) {
			await comment.updateOne({ $push: { likes: currentUserId } });
			res.status(200).json("Comment has been liked");
		} else {
			await comment.updateOne({ $pull: { likes: currentUserId } });
			res.status(200).json("Comment has been disliked");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

//GET A Comment
const getComment = async (req, res) => {
	const idComment = req.comment.id;
	const comment = await Comment.findById(idComment);
	res.status(200).json(comment);
};

//GET ALL CommentS
const getCommentsTimeline = async (req, res) => {
	const currentUserId = req.verifiedUser._id;
	try {
		/* Getting the current user from the database. */
		const currentUser = await User.findById(currentUserId);

		/* Getting all the Comments of the current user. */
		const userComment = await Comment.find({ author: currentUserId });

		/* A way to get all the Comments of the users that the current user is following. */
		const friendComment = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Comment.find({ author: friendId });
			})
		);

		res.status(200).json(userComment.concat(...friendComment));
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;
module.exports.likeComment = likeComment;
module.exports.getComment = getComment;
module.exports.getCommentsTimeline = getCommentsTimeline;
