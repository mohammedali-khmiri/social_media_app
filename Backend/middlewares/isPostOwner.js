module.exports = (req, res, next) => {
	const authorPost = req.post.author.toString();
	const currentUser = req.verifiedUser._id;

	if (authorPost === currentUser) {
		next();
	} else {
		return res.status(401).json("You not allow to do this");
	}
};
