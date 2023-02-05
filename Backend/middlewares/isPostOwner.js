module.exports = (req, res, next) => {
	const authorPost = req.post.author.toString();
	const currentUser = req.verifiedUser._id;
	console.log(authorPost);
	console.log(currentUser);
	if (authorPost === currentUser) {
		next();
	} else {
		return res.status(401).json("Yon Not Allow To Do This");
	}
};
