const router = require("express").Router();
const utils = require("../utils");
const { SPost } = require("../config/db");
const authMW = require("../middleware").auth;
const { controller } = require("../controllers");
const { isAuth, isAdmin } = require("./authMiddle");
const logs = require("../config/logs");

router.post("/newPost", (req, res, next) => {
    logs.infoLog("be recv new post req");
    console.log("content: ", req.body.data);
    const newPost = new SPost({
        time: Date.now(),
        content: req.body.data,
    });
    newPost
        .save()
        .then((post) => {
            console.log("--> db save new post: ", post);
            res.status(200).json({ post_save: true });
        })
        .catch((err) => {
            logs.errLog(err);
            res.status(400).json({ post_save: false });
        });
});

router.get("/blogPosts", (req, res) => {
    logs.infoLog("be recv all posts req");
    const allPost = 0;
});

module.exports = router;
