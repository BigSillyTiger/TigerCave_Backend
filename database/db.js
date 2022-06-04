const mongoose = require("mongoose");

require("dotenv").config();

const mongoUrl = process.env.DB_STRING;

/* 
const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    hash: String,
    salt: String,
    admin: Boolean,
});

const roarSchema = new mongoose.Schema({
    pairedId: { type: String, require: true },
    date: { type: Date, require: true },
    content: { type: String, require: true },
    archive: { type: Boolean, default: false, require: true },
});

const roarPicSchema = new mongoose.Schema({
    pairedId: { type: String, require: true },
    pics: {
        data: Buffer,
        contentType: String,
    },
});

const dbConnection = mongoose.createConnection(mongoUrl, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
});

// 1st para is collection name
const User = dbConnection.model("User", userSchema);
const Roar = dbConnection.model("Roar", roarSchema);
const RoarPic = dbConnection.model("RoarPic", roarPicSchema);

module.exports = {
    dbConnection,
    User,
    Roar,
};

 */

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (error) {
        console.log("=> err: ", error);
    }
};

module.exports = {
    connectDB,
};
