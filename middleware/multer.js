const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");

const mongoUrl = process.env.DB_STRING;

const randomName = (name) => {
    const buf = crypto.randomBytes(16);
    return buf.toString("hex") + path.extname(name);
};

const storage = new GridFsStorage({
    url: mongoUrl,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    file: (req, file) => {
        const uuid = req.params.uuid;
        const match = ["image/png", "image/jpg", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            // not pics
            return {
                bucketName: "mass",
                filename: `${randomName(file.originalname)}`,
            };
        }
        return {
            bucketName: "roarpic",
            filename: `${randomName(file.originalname)}`,
            metadata: { uuid },
        };
    },
});

module.exports = multer({ storage });
