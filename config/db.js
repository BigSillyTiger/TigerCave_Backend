const mongoose = require('mongoose')

require("dotenv").config()

const mongoUrl = process.env.DB_STRING

const userSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
})

const dbConnection = mongoose.createConnection(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 1st para is collection name
const User = dbConnection.model('User', userSchema)

module.exports = {
    dbConnection,
    User
}
