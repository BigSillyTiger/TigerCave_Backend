const path = require('path')
const express = require("express")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const routers = require('./routes')
const passport = require('passport')
const strategy = require('./middleware/passport')

require('dotenv').config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// sessions setup
const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    //dbName: process.env.DB_NAME,
    collectionName: process.env.DB_SESSIONS_COLLECTION
})

app.use(session({
    secret: process.env.DB_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 2 days
    }
}))

// passport setup
require("./middleware/passport")

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    //console.log('==> server req.sessions: ', req.session)   
    //console.log('==> server req: ', req)   
    next()
})

app.use(routers.auth)

app.listen(3000)