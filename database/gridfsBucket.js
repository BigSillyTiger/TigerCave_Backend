const mongoose = require("mongoose");

const getBucket = (bucketName) => {
    const conn = mongoose.connection;
    return new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName,
    });
};

module.exports = getBucket;
