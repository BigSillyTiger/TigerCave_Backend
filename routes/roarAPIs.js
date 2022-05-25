const router = require("express").Router();
const utils = require("../utils");
const { Roar } = require("../config/db");
const { authMW, adminMW } = require("../middleware").auth;
const { controller } = require("../controllers");
const logs = require("../config/logs");

const API_REQ_ROAR = "/roars";

router.post(API_REQ_ROAR, (req, res, next) => {
    console.log("content: ", req.body.data);
    const newRoar = new Roar({
        date: Date.now(),
        content: req.body.data,
        archive: false,
    });
    newRoar
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

router.put(API_REQ_ROAR, [authMW, adminMW], (req, res) => {
    console.log("------> be recv put roar req: ", req.body.data);
    Roar.findByIdAndUpdate(req.body.data, { archive: true }).then((post) => {
        console.log("--> put req found id item: ", post);
    });
    res.status(200).json({ hidetest: true });
});

router.get(API_REQ_ROAR, (req, res) => {
    Roar.find({ archive: false })
        .sort([["date", "descending"]])
        .then((post) => {
            if (!post) {
                res.status(401).json({
                    success: true,
                    content_num: 0,
                    msg: "Could not find content",
                });
            }
            console.log("------> server post: ", post);
            res.status(200).json({
                success: true,
                content_num: post.length,
                content: JSON.stringify(post),
            });
        })
        .catch((err) => {
            logs.errLog(err);
            res.status(401).json({
                success: true,
                content_num: 0,
                msg: "Could not find content",
            });
        });
});

router.delete(`${API_REQ_ROAR}/:id`, [authMW, adminMW], (req, res, next) => {
    Roar.findOneAndDelete({ _id: req.params["id"] })
        .then((result) => {
            console.log("-> succeed: ", result);
            res.status(200).json({ result: "delete successed" });
        })
        .catch((err) => {
            res.status(401).json({ result: "delete failed" });
        });
});

module.exports = router;
