module.exports = (req, res, next) => {
	/* Checking if the user in params is the same as the user that is logged in. */
	const idUser = req.user.id;
	const currentUserId = req.verifiedUser._id;
	const isAdmin = req.verifiedUser.isAdmin;

	if (currentUserId === idUser || isAdmin) {
		next();
	} else {
		return res.status(401).json("You not allow to do this");
	}
};
