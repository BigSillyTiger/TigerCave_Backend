const { GridFsStorage } = require("multer-gridfs-storage");
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

const findRoarPics = (uuid) => {
    try {
        picsServices
            .findFile({ metadata: { uuid } })
            .then((result) => result.toArray())
            .then((result) => {
                const pics = result.map((item) => item.filename);
                return pics;
            })
            .catch((err) => {
                return [];
            });
    } catch (error) {
        return [];
    }
};

module.exports = {
    uploadImgStreamer,
    deleteUploadedImg,
    findFile,
    findRoarPics,
};
