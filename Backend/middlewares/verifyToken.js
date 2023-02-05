const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("access_token");
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
