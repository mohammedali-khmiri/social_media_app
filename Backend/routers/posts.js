const router = require("express").Router();
const Post = require("../models/post.model");

const {
	createPost,
	updatePost,
	deletePost,
	likePost,
	getPost,
	getTimeline,
} = require("../controllers/post.controller");
const { verifyToken, isPostOwner } = require("../middlewares");

//param post
router.param("post", async (req, res, next, id) => {
	try {
		const post = await Post.findById(id);
		if (!post) {
			return res.status(404).json("Post not found ");
		} else {
			req.post = post;
			next();
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});

// create a post router
router.post("/create", verifyToken, createPost);

//update a post router
router.put("/:post", verifyToken, isPostOwner, updatePost);

//delete a post router
router.delete("/:post", verifyToken, isPostOwner, deletePost);

//like/ dislike a post router
router.put("/:post/like", likePost);

//get a post router
router.get("/:post", getPost);

//get all post of my followings
router.get("/timeline/all", getTimeline);

module.exports = router;
