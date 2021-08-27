// jshint ignore: start

const util = require("util");
const mongoose = require("mongoose");
const redis = require("redis");
const keys = require("../config/keys");
const client = redis.createClient(keys.redisURL);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || "");
	return this;
};

mongoose.Query.prototype.exec = async function () {
	if (!this.useCache) {
		return exec.apply(this, arguments);
	}

	// this.getFilter() -returns the list of query criterias or conditions
	// this.mongooseCollection.name - returns the model / collection that's been queried.
	const key = JSON.stringify(
		Object.assign({}, this.getFilter(), {
			collection: this.mongooseCollection.name,
		})
	);
	const cachedValue = await client.hget(this.hashKey, key);
	if (cachedValue) {
		const docs = JSON.parse(cachedValue);
		return Array.isArray(docs)
			? docs.map((doc) => this.model(doc))
			: this.model(docs);
	}
	const results = await exec.apply(this, arguments);
	client.hset(this.hashKey, key, JSON.stringify(results));
	return results;
};

module.exports = {
	clearCache(hashKey) {
		client.del(hashKey);
	},
};
