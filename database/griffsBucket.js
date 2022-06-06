const mongoose = require("mongoose");

const conn = mongoose.connection;

module.exports = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "roarpic",
});
