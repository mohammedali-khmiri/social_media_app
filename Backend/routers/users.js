const router = require("express").Router();
const User = require("../models/user.model");
const {
	updateUser,
	deleteUser,
	getUser,
	followUser,
	unfollowUser,
} = require("../controllers/user.controller");
const { verifyToken, isSameUser, isAdmin } = require("../middlewares");

//param user
router.param("user", async (req, res, next, id) => {
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json("User not found ");
		} else {
			req.user = user;
			next();
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});

//update user router
router.put("/:user", verifyToken, isSameUser, updateUser);

//delete user router
router.delete("/:user", verifyToken, isSameUser, deleteUser);

//get user router
router.get("/:user", verifyToken, getUser);

//follow user router
router.put("/:user/follow", verifyToken, followUser);

//unfollow user router
router.put("/:user/unfollow", verifyToken, unfollowUser);

module.exports = router;
