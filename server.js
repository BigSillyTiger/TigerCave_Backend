const path = require('path')
const express = require("express")
const session = require('express-session')
const MongoStore = require('connect-mongo')

require('dotenv').config()
//require("./config/db")

const app = express()

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    dbName: process.env.DB_NAME,
    collectionName: process.env.DB_SESSIONS_COLLECTION
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// stored on the server side
app.use(session({
    secret: process.env.DB_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 2 days
    }
}))



app.get("/", (req, res) => {
    if(req.session.viewCount) {
        req.session.viewCount++
    } else {
        req.session.viewCount = 1
    }
    res.send(`<h1>Hello World (${req.session.viewCount} times)</h1>`)
})

app.listen(3000)