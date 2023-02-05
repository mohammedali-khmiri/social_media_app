const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//UPDATE USER
const updateUser = async (req, res) => {
	const idUser = req.user.id;
	/* This is a conditional statement that checks if the userId in the request body is equal to the id in
        the params or if the user is an admin.*/
	if (req.body.userId === idUser || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (error) {
				return res.status(500).json(error);
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
	} else {
		return res.status(403).json("You can update only your account!");
	}
};

//DELETE USER
const deleteUser = async (req, res) => {
	const idUser = req.user.id;
	/* This is a conditional statement that checks if the userId in the request body is equal to the id in
    the params or if the user is an admin.*/
	if (req.body.userId === idUser || req.body.isAdmin) {
		try {
			await User.findByIdAndDelete(idUser);
			res.status(200).json("Account has been deleted ");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(403).json("You can delete only your account !");
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

	if (req.body.userId !== idUser) {
		try {
			const user = await User.findById(idUser);
			const currentUser = await User.findById(req.body.userId);
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { followings: idUser } });
				res.status(200).json("user has been followed");
			} else {
				res.status(403).json("you already follow this user");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You cant follow your self!");
	}
};

//UNFOLLOW USER
const unfollowUser = async (req, res) => {
	const idUser = req.user.id;
	if (req.body.userId !== idUser) {
		try {
			const user = await User.findById(idUser);
			const currentUser = await User.findById(req.body.userId);
			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { followings: idUser } });
				res.status(200).json("user has been unFollowed");
			} else {
				res.status(403).json("you already unFollow this user");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("You cant unFollow your self!");
	}
};

module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.followUser = followUser;
module.exports.unfollowUser = unfollowUser;
