const path = require("path");
const express = require("express");
//const session = require('express-session')
const cookieParser = require("cookie-parser");
var cors = require("cors");
//const MongoStore = require('connect-mongo')
const routers = require("./routes");

//const log = require('./config/logs')

require("dotenv").config();

const app = express();
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sessions setup
/* const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    //dbName: process.env.DB_NAME,
    collectionName: process.env.DB_SESSIONS_COLLECTION
}) */

/* app.use(session({
    secret: process.env.DB_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3 // 2 days
    }
})) */

app.use(routers.auth);
app.use(routers.post);

app.listen(8000);
