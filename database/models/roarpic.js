const mongoose = require("mongoose");

const roarPicSchema = new mongoose.Schema({
    pairedId: { type: String, require: true },
    pics: {
        data: Buffer,
        contentType: String,
    },
});

// mongoose will create roars collection in mongodb
module.exports = mongoose.model("Roarpic", roarPicSchema);
