const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	/* Getting the token from the header. */
	const token = req.header("access_token");

	/* This is a middleware function that checks if the token is provided or not. If the token is
	provided, it verifies the token and if the token is not provided, it returns an error message. */
	if (!token) {
		return res.status(401).send("No Token Provided");
	} else {
		try {
			/* Verifying the token. */
			const verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
			req.verifiedUser = verifiedUser;
			next();
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
};
