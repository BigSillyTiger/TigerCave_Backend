const gridfsBucket = require("../database/griffsBucket");

const uploadImgStreamer = (filename) => {
    return gridfsBucket.openDownloadStreamByName(filename);
};

module.exports = {
    uploadImgStreamer,
};
