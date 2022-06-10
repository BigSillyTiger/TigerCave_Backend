const roarsServices = require("../services/roarsServices");
const picsServices = require("../services/picsServices");

const { BlankText } = require("../config/presets");
const { post } = require("../routes/pic");
/* 
    add a new roar
 */
const addRoar = (req, res) => {
    const option = {
        pairedId: req.body.data.uuid,
        date: Date.now(),
        content:
            req.body.data.content === "" ? BlankText : req.body.data.content,
        archive: false,
        pics: req.body.data.pics,
    };

    console.log("==> be add new roar: ", option);

    roarsServices
        .addRoar(option)
        .then((result) => {
            //console.log("--> controller save new post: ", post);
            res.status(200).json({ roar_save: true });
        })
        .catch((err) => {
            logs.errLog(err);
            res.status(401).json({ roar_save: false });
        });
};

/* 
    archive a roar
    RM: going to change this to a roar modification api
*/
const archiveRoar = (req, res) => {
    const roarID = req.body.data.archiveID;
    const option = {
        archive: req.body.data.archiveFlag,
    };

    roarsServices
        .updateRoar(roarID, option)
        .then((result) => {
            //console.log("--> controller save new post: ", post);
            res.status(200).json({ archived: true });
        })
        .catch((err) => {
            logs.errLog(err);
            res.status(401).json({ archived: false });
        });
};

/* 
    get roars archived / non archived
*/
const getRoars = (req, res, config) => {
    const option = {
        archive: false,
    };
    switch (config) {
        case "Archive":
            option.archive = true;
            break;
        case "Normal":
            option.archive = false;
            break;
        default:
            option.archive = false;
            break;
    }
    try {
        roarsServices
            .getRoars(option)
            .then((posts) => {
                if (!posts) {
                    res.status(401).json({
                        success: true,
                        content_num: 0,
                        msg: "Could not find content",
                    });
                }
                return posts;
            })
            .then((result) => {
                return res.status(200).json({
                    success: true,
                    content_num: result.length,
                    content: JSON.stringify(result),
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(401).json({
                    success: true,
                    content_num: 0,
                    msg: "Could not find content",
                });
            });
    } catch (error) {
        return res.status(400).json({ error: "error occurs" });
    }
};

const deleteRoar = (req, res) => {
    const id = req.params["id"];
    roarsServices
        .deleteRoar(id)
        .then((result) => {
            console.log("-> succeed: ", result);
            res.status(200).json({ result: "delete successed" });
        })
        .catch((err) => {
            res.status(401).json({ result: "delete failed" });
        });
};

module.exports = {
    addRoar,
    archiveRoar,
    getRoars,
    deleteRoar,
};
