const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const mongoUrl = process.env.DB_STRING;

const storage = new GridFsStorage({
    url: mongoUrl,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            // not pics
            return {
                bucketName: "mass",
                filename: `${Date.now()}-xxx-${file.originalname}`,
            };
        }
        return {
            bucketName: "roarpic",
            filename: `${Date.now()}-xxx-${file.originalname}`,
        };
    },
});

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
}); 
const uploadMW = multer({ storageGF });

module.exports = {
    uploadMW,
};
*/

module.exports = multer({ storage });
