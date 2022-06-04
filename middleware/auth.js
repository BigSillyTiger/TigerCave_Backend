const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const logs = require("../config/logs");
const { LOGIN_COOKIES } = require("../config/presets");

const pubToken = path.join(__dirname, "../utils/keys", "public_key.pem");
const PUB_KEY = fs.readFileSync(pubToken, "utf8");

const authMW = (req, res, next) => {
    if (LOGIN_COOKIES in req.cookies) {
        const tokenParts = req.cookies.login.split(" ");

        if (
            tokenParts[0] === "Bearer" &&
            tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
        ) {
            try {
                jwt.verify(tokenParts[1], PUB_KEY, {
                    algorithms: ["RS256"],
                });
                next();
            } catch (err) {
                logs.errLog(err);
                res.status(401).json({
                    success: false,
                    msg: "You are not authorized to visit this page.",
                });
            }
        }
    } else {
        logs.infoLog("no login cookie found");
        res.status(401).json({
            success: false,
            msg: "You are not authorized to visit this page.",
        });
    }
};

const adminMW = (req, res, next) => {
    if (1) {
        next();
    } else {
        res.status(401).json({ success: false, msg: "You are not Ammin" });
    }
};

module.exports = {
    authMW,
    adminMW,
};
