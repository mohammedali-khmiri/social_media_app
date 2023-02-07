const verifyToken = require("./verifyToken");
const isPostOwner = require("./isPostOwner");
const isSameUser = require("./isSameUser");
const isAdmin = require("./isAdmin");

module.exports.verifyToken = verifyToken;
module.exports.isPostOwner = isPostOwner;
module.exports.isSameUser = isSameUser;
module.exports.isAdmin = isAdmin;
