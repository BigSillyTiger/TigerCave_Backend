const mongoose = require("mongoose");

const roarSchema = new mongoose.Schema({
    pairedId: { type: String, require: true },
    date: { type: Date, require: true },
    content: { type: String, require: true },
    archive: { type: Boolean, default: false, require: true },
});

// mongoose will create roars collection in mongodb
module.exports = mongoose.model("Roar", roarSchema);
