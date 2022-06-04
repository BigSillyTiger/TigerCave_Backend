const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    hash: String,
    salt: String,
    admin: Boolean,
});

// mongoose will create roars collection in mongodb
module.exports = mongoose.model("User", userSchema);
