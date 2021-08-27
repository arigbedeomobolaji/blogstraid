const mongoose = require("mongoose");
// const User = mongoose.model("user");
const User = require("../../models/User");

module.exports = () => {
	const user = new User({
		// googleId: "114838902039273282163",
		// displayName: "Arigbede Omobolaji",
	});
	return user.save();
};
