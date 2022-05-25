const mongoose = require("mongoose");

require("dotenv").config();

const mongoUrl = process.env.DB_STRING;

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean,
});

const roarSchema = new mongoose.Schema({
    date: Date,
    content: String,
    archive: Boolean,
});

const dbConnection = mongoose.createConnection(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 1st para is collection name
const User = dbConnection.model("User", userSchema);
const Roar = dbConnection.model("Roar", roarSchema);

module.exports = {
    dbConnection,
    User,
    Roar,
};
