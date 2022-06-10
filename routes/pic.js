const router = require("express").Router();
const { authMW, adminMW } = require("../middleware/auth");
const picsController = require("../controllers/picsController");
const upload = require("../middleware/multer");

const API_REQ_UPLOAD = "/api/pic";

router.post(
    `${API_REQ_UPLOAD}/:uuid`,
    [authMW, upload.single("roarImg")],
    picsController.uploadImg
);

router.get("/api/retrieveimg/:filename", picsController.retrieveImg);

router.delete(
    "/api/retrieveimg/:filename",
    //[authMW],
    picsController.deleteImg
);

router.post("/api/clear/uploadimgs", [authMW], picsController.clearULImgs);

router.delete("/api/test/deleteall", picsController.deleteTestAll);

module.exports = router;
