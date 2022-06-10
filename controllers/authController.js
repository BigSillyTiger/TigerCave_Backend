const { v4: uuidv4 } = require("uuid");
const utils = require("../utils");
const authServices = require("../services/authServices");
const logs = require("../config/logs");
const { LOGIN_COOKIES } = require("../config/presets");

const login = async (req, res) => {
    logs.infoLog("receive admin login req");
    const username = req.body.username;
    await authServices
        .findUser(username)
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    success: true,
                    msg: "Could not find the user.",
                });
            }
            const isValid = utils.pw.verifyPassword(
                req.body.password,
                user.hash,
                user.salt
            );
            if (isValid) {
                const tokenObj = utils.jwt.issueJWT(user);
                res.cookie(LOGIN_COOKIES, tokenObj.token, {
                    maxAge: tokenObj.expires,
                    httpOnly: true,
                });
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "You entered wrong loggin info.",
                });
            }
        })
        .catch((err) => {
            logs.errLog(err);
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        });
};

const logout = (req, res) => {
    try {
        res.clearCookie("login");
        res.status(200).json({ note: "successfully logout" });
    } catch (error) {
        res.status(400).json({ error: "logout error" });
    }
};

module.exports = {
    login,
    logout,
};
