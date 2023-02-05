const Post = require("../models/post.model");
const User = require("../models/user.model");

//CREATE A POST
const createPost = async (req, res) => {
	const newPost = new Post({
		desc: req.body.desc,
		img: req.body.img,
		author: req.verifiedUser._id,
	});
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

//UPDATE A POST
const updatePost = async (req, res) => {
	const idPost = req.post.id;
	const post = await Post.findById(idPost);

	await post.updateOne({ $set: req.body });
	res.status(200).json("Post has been updated");
};

//DELETE A POST
const deletePost = async (req, res) => {
	const idPost = req.post.id;
	const post = await Post.findById(idPost);
	if (post.userId === req.body.userId) {
		await post.deleteOne();
		res.status(200).json("Post has been deleted");
	} else {
		res.status(500).json("You can delete only your post");
	}
};

//LIKE A POST
const likePost = async (req, res) => {
	const idPost = req.post.id;
	try {
		const post = await Post.findById(idPost);
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json("Post has been liked");
		} else {
			await post.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json("Post has been disliked");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

//GET A POST
const getPost = async (req, res) => {
	const idPost = req.post.id;
	const post = await Post.findById(idPost);
	res.status(200).json(post);
};

//GET ALL POSTS
const getTimeline = async (req, res) => {
	try {
		/* Getting the current user from the database. */
		const currentUser = await User.findById(req.body.userId);

		/* Getting all the posts of the current user. */
		const userPost = await Post.find({ userId: currentUser._id });

		/* A way to get all the posts of the users that the current user is following. */
		const friendPost = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);

		res.status(200).json(userPost.concat(...friendPost));
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.likePost = likePost;
module.exports.getPost = getPost;
module.exports.getTimeline = getTimeline;
