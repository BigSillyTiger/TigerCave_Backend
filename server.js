const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

var cors = require("cors");
//const MongoStore = require('connect-mongo')
const log = require("./config/logs");
const { connectDB } = require("./database/db");

require("dotenv").config();

const app = express();

connectDB();
const conn = mongoose.connection;

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

conn.once("open", () => {
    log.infoLog("connected to the DB");

    app.use(require("./routes/auth"));
    app.use(require("./routes/roar"));
    app.use(require("./routes/upload"));

    app.listen(8000, () => {
        log.infoLog("server runs on 8000");
    });
});
