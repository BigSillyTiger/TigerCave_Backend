const picsServices = require("../services/picsServices");
const log = require("../config/logs");

const uploadImg = async (req, res) => {
    console.log("======> server upload img uuid: ", req.params.uuid);
    if (req.file === undefined) {
        return res.status(400).json({ error: "a file must be selected" });
    }
    try {
        const imgURL = `http://localhost:8000/api/retrieveimg/${req.file.filename}`;

        return res.status(200).json({ title: req.file.filename, url: imgURL });
    } catch (error) {
        console.log("=> error on upload img: ", error);
        return res.status(400).json({ error: "upload img err" });
    }
};

const retrieveImg = async (req, res) => {
    try {
        //picsServices.uploadImgStreamer(req.params.filename).pipe(res);
        const stream = await picsServices.uploadImgStreamer(
            req.params.filename
        );
        stream.on("data", (data) => {
            return res.status(200).write(data);
        });
        stream.on("error", (err) => {
            return res.status(400).json({ message: "cannot download img" });
        });
        stream.on("end", () => {
            return res.end();
        });
    } catch (error) {
        console.log("=> NOT found the test result, err: ", error);
        return res.status(400).json({ error: "retrieve err" });
    }
};

const deleteImg = async (req, res) => {
    const name = req.params.filename;

    try {
        await picsServices
            .findFile({ filename: name })
            .then((result) => {
                result.forEach((doc) => {
                    console.log("=>>> dound: ", doc);
                    picsServices.deleteUploadedImg(doc._id);
                    console.log("=> FINISHED delete");
                });
                res.status(200).json({ msg: "deleted img success" });
            })
            .catch((err) => {
                log.errLog("delete img error");
                return res.status(400).json({ error: "delete err" });
            });
    } catch (error) {
        console.log("=> error on delete img: ", error);
        return res.status(400).json({ error: "delete err" });
    }
};

const clearULImgs = async (req, res) => {
    try {
        const data = req.body.data;
        console.log("=> be delete upload list: ", data);
        await data.map((item) => {
            picsServices
                .findFile({ filename: item.title })
                .then((result) => {
                    result.forEach((doc) => {
                        picsServices.deleteUploadedImg(doc._id);
                    });
                })
                .catch((error) => {
                    console.log("=> clear ul imgs error: ", error);
                });
            return res.status(200).json({ result: "succeed clear ul imgs" });
        });
    } catch (error) {
        return res.status(400).json({ result: "failed clear ul imgs" });
    }
};

const deleteTestAll = async (req, res) => {
    try {
        await picsServices
            .findFile({})
            .then((result) => {
                result.forEach((doc) => {
                    picsServices.deleteUploadedImg(doc._id);
                });
                return res.status(200).json({ msg: "deleted img success" });
            })
            .catch((err) => {
                return res.status(400).json({ error: "delete err" });
            });
    } catch (error) {
        return res.status(400).json({ error: "delete err" });
    }
};

module.exports = {
    uploadImg,
    retrieveImg,
    deleteImg,
    clearULImgs,
    deleteTestAll,
};
