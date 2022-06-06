const uploadServices = require("../services/uploadServices");

const uploadImg = (req, res) => {
    if (req.file === undefined) {
        return res.status(400).json({ error: "a file must be selected" });
    }
    const imgURL = `http://localhost:8000/api/retrieveimg/${req.file.filename}`;
    return res.status(200).send(imgURL);
};

const retrieveImg = async (req, res) => {
    const stream = uploadServices.uploadImgStreamer(req.params.filename);
    await stream.pipe(res);
};

module.exports = { uploadImg, retrieveImg };
