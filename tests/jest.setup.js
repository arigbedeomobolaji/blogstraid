require("../models/User");
jest.setTimeout(100000);

const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI + keys.dbName, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => console.warn("Warning", error));
