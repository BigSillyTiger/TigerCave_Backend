const crypto = require('crypto')

const encryptWithPublicKey = (publicKey, msg) => {
    const bufferMsg = Buffer.from(msg, 'utf8')
    return crypto.publicEncrypt(publicKey, bufferMsg)
}

const encryptWithPrivateKey = (privateKey, msg) => {
    const bufferMsg = Buffer.from(msg, 'utf8')
    return crypto.privateEncrypt(privateKey, bufferMsg)
}

module.exports = {encryptWithPublicKey, encryptWithPrivateKey}