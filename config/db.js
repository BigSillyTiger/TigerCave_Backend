const mongoose = require('mongoose')

require("dotenv").config()

const mongoUrl = process.env.DB_STRING

const mongoOptions = {
    dbName: process.env.dbName
}

const authSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
})

const dbConnection = mongoose.createConnection(mongoUrl, mongoOptions)

// 1st para is collection name
const UserAuth = dbConnection.model('auth', authSchema)
