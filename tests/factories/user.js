const mongoose = require("mongoose");
// const User = mongoose.model("user");
const User = require("../../models/User");

module.exports = async () => {
	const user = new User({});
	return await user.save();
};
