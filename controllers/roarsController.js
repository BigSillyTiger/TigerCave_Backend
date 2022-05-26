const Services = require("../services");

/* 
    add a new roar
 */
const addRoar = (req, res) => {
    const option = {
        date: Date.now(),
        content: req.body.data,
        archive: false,
    };

    Services.roarsService
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

    Services.roarsService
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
    Services.roarsService
        .getRoars(option)
        .then((post) => {
            if (!post) {
                res.status(401).json({
                    success: true,
                    content_num: 0,
                    msg: "Could not find content",
                });
            }
            //console.log("------> server post: ", post);
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
};

const deleteRoar = (req, res) => {
    const id = req.params["id"];
    Services.roarsService
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
