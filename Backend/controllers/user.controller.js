const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//UPDATE USER
const updateUser = async (req, res) => {
	const idUser = req.user.id;

	if (req.body.password) {
		try {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}
	try {
		await User.findByIdAndUpdate(idUser, {
			$set: req.body,
		});

		res.status(200).json("Account has been updated ");
	} catch (error) {
		return res.status(500).json(error);
	}
};

//DELETE USER
const deleteUser = async (req, res) => {
	const idUser = req.user.id;

	try {
		await User.findByIdAndDelete(idUser);
		res.status(200).json("Account has been deleted ");
	} catch (error) {
		return res.status(500).json(error);
	}
};

//GET USER
const getUser = async (req, res) => {
	const idUser = req.user.id;

	try {
		const user = await User.findById(idUser);
		const { password, updatedAt, isAdmin, ...other } = user._doc;
		res.status(200).json(other);
	} catch (error) {
		res.status(500).json(error);
	}
};

// FOLLOW USER
const followUser = async (req, res) => {
	const idUser = req.user.id;
	const currentUserId = req.verifiedUser._id;

	if (currentUserId !== idUser) {
		try {
			const user = await User.findById(idUser);
			const currentUser = await User.findById(currentUserId);
			if (!user.followers.includes(currentUserId)) {
				await user.updateOne({ $push: { followers: currentUserId } });
				await currentUser.updateOne({ $push: { followings: idUser } });
				res.status(200).json("User has been followed");
			} else {
				res.status(403).json("You already follow this user");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You can't follow your self!");
	}
};

//UNFOLLOW USER
const unfollowUser = async (req, res) => {
	const idUser = req.user.id;
	const currentUserId = req.verifiedUser._id;

	if (currentUserId !== idUser) {
		try {
			const user = await User.findById(idUser);
			const currentUser = await User.findById(currentUserId);
			if (user.followers.includes(currentUserId)) {
				await user.updateOne({ $pull: { followers: currentUserId } });
				await currentUser.updateOne({ $pull: { followings: idUser } });
				res.status(200).json("User has been unFollowed");
			} else {
				res.status(403).json("You already unFollow this user");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You can't unFollow your self!");
	}
};

module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.followUser = followUser;
module.exports.unfollowUser = unfollowUser;
