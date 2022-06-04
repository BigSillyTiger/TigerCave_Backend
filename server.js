const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
//const session = require('express-session')
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
var cors = require("cors");
//const MongoStore = require('connect-mongo')
const log = require("./config/logs");
const { connectDB } = require("./database/db");

require("dotenv").config();

const app = express();

connectDB();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/auth"));
app.use(require("./routes/roar"));

mongoose.connection.once("open", () => {
    log.infoLog("connected to the DB");
    app.listen(8000, () => {
        log.infoLog("server runs on 8000");
    });
});

/* app.listen(8000, () => {
    log.infoLog("server runs on 8000");
}); */
