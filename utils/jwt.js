const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const privToken = path.join(__dirname, "./keys", "private_key.pem");
const PRIV_KEY = fs.readFileSync(privToken, "utf8");

const issueJWT = (user) => {
    const _id = user._id;
    const expiresIn = 1000 * 60 * 60 * 24;
    const payload = {
        sub: _id,
        iat: Date.now(),
    };
    const signedToken = jwt.sign(payload, PRIV_KEY, {
        expiresIn,
        algorithm: "RS256",
    });
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn,
    };
};

module.exports = {
    issueJWT,
};
