const Story = require("../models/story.model");
const User = require("../models/user.model");

//CREATE A STORY
const createStory = async (req, res) => {
	const newStory = new Story({
		img: req.body.img,
		author: req.verifiedUser._id,
	});
	try {
		const savedStory = await newStory.save();
		res.status(200).json(savedStory);
	} catch (error) {
		res.status(500).json(error.message);
	}
};

//UPDATE A STORY
const updateStory = async (req, res) => {
	const idStory = req.story.id;

	const story = await Story.findById(idStory);

	await story.updateOne({ $set: req.body });
	res.status(200).json("Story has been updated");
};

//DELETE A STORY
const deleteStory = async (req, res) => {
	const idStory = req.story.id;
	const story = await Post.findById(idStory);
	if (story.userId === req.body.userId) {
		await story.deleteOne();
		res.status(200).json("Story has been deleted");
	} else {
		res.status(500).json("You can delete only your story");
	}
};

//LIKE / DISLIKE A STORY
// const likeStory = async (req, res) => {
// 	const idStory = req.story.id;
// 	const currentUserId = req.verifiedUser._id;
// 	try {
// 		const story = await Story.findById(idStory);
// 		if (!story.likes.includes(currentUserId)) {
// 			await story.updateOne({ $push: { likes: currentUserId } });
// 			res.status(200).json("Story has been liked");
// 		} else {
// 			await story.updateOne({ $pull: { likes: currentUserId } });
// 			res.status(200).json("Story has been disliked");
// 		}
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// };

//GET A STORY
const getStory = async (req, res) => {
	const idStory = req.story.id;
	const story = await Story.findById(idStory);
	res.status(200).json(story);
};

//GET ALL STORIES
const getStoryTimeline = async (req, res) => {
	const currentUserId = req.verifiedUser._id;
	try {
		/* Getting the current user from the database. */
		const currentUser = await User.findById(currentUserId);

		/* Getting all the stories of the current user. */
		const userStory = await Story.find({ author: currentUserId });

		/* A way to get all the stories of the users that the current user is following. */
		const friendStory = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Story.find({ author: friendId });
			})
		);

		res.status(200).json(userStory.concat(...friendStory));
	} catch (error) {
		res.status(500).json(error.message);
	}
};

module.exports.createStory = createStory;
module.exports.updateStory = updateStory;
module.exports.deleteStory = deleteStory;
module.exports.likeStory = likeStory;
module.exports.getStory = getStory;
module.exports.getStoryTimeline = getStoryTimeline;
