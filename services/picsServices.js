const gridfsBucket = require("../database/gridfsBucket");

const bucketName = "roarpic";

const findFile = async (option) => {
    return await gridfsBucket(bucketName).find(option);
};

const uploadImgStreamer = (filename) => {
    return gridfsBucket(bucketName).openDownloadStreamByName(filename);
};

const deleteUploadedImg = (id) => {
    return gridfsBucket(bucketName).delete(id, (err) => {
        err
            ? console.log("-> error on delete pic: ", id, err)
            : console.log("=> deleted pic: ", id);
    });
};

module.exports = {
    uploadImgStreamer,
    deleteUploadedImg,
    findFile,
};
