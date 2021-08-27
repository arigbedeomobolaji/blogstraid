const { clearCache } = require("../services/cache");

module.exports = {
	async cleanCache(req, res, next) {
		const user = req.user;

		// waits for the route it is called in to execute first then this middleware fires the clearCache(req.user.id) call.
		await next();

		clearCache(user.id);
	},
};
