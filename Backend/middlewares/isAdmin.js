module.exports = (req, res, next) => {
	 

	/* This is a middleware function that checks if the user is an admin. If the user is an admin, the
	next function is called. If the user is not an admin, the user is returned a 401 status code and a
	message saying "You are not an Admin". */
	if (req.verifiedUser.isAdmin) {
		next();
	} else {
		return res.status(401).json("You are not an Admin");
	}
};
