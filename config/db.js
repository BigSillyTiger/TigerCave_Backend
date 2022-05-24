const mongoose = require("mongoose");

require("dotenv").config();

const mongoUrl = process.env.DB_STRING;

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean,
});

const shortPostSchema = new mongoose.Schema({
    time: Date,
    content: String,
});

const dbConnection = mongoose.createConnection(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 1st para is collection name
const User = dbConnection.model("User", userSchema);
const SPost = dbConnection.model("Post", shortPostSchema);

module.exports = {
    dbConnection,
    User,
    SPost,
};
