const router = require("express").Router();
const { authMW, adminMW } = require("../middleware").auth;
const uploadController = require("../controllers/uploadController");
const upload = require("../middleware").multer;

const API_REQ_UPLOAD = "/api/upload";

router.post(
    API_REQ_UPLOAD,
    [authMW, adminMW, upload.single("roarImg")],
    (req, res) => {
        console.log("===> be upload test API");
        uploadController.uploadImg(req, res);
    }
);

router.get("/api/retrieveimg/:filename", (req, res) => {
    try {
        uploadController.retrieveImg(req, res);
    } catch (error) {
        console.log("=> upload img error: ", error);
        res.send("=> upload pic error");
    }
});

router.delete("/api/retrieveimg/:filename", (req, res) => {});

module.exports = router;
