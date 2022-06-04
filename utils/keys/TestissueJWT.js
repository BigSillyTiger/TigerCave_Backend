const base64url = require("base64url");
const crypto = require("crypto");
const signatureFn = crypto.createSign("RSA-SHA256");
const varifyFn = crypto.createVerify("RSA-SHA256");
const fs = require("fs");

const headerObj = {
    alg: "RS256",
    typ: "JWT",
};

const payloadObj = {
    sub: "1234567890",
    name: "Areos CC",
    admin: true,
    iat: 1424563456,
};

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const b64uHeader = base64url(headerObjString);
const b64uPayload = base64url(payloadObjString);

signatureFn.write(b64uHeader + "." + b64uPayload);
signatureFn.end();

const PRIV_KEY = fs.readFileSync(__dirname + "/private_key.pem", "utf8");
const signatureB64 = signatureFn.sign(PRIV_KEY, "base64");

const signatureB64Url = base64url.fromBase64(signatureB64);

// library

const jwt = require("jsonwebtoken");
const PUB_KEY = fs.readFileSync(__dirname + "/public_key.pem", "utf8");

const signedJWT = jwt.sign(payloadObj, PRIV_KEY, { algorithm: "RS256" });

jwt.verify(signedJWT, PUB_KEY, { algorithms: ["RS256"] }, (err, payload) => {
    console.log(payload);
});
