const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const uploadMW = multer({ storage });

module.exports = {
    uploadMW,
};
