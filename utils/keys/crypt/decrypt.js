const crypto = require('crypto')

const decryptWithPrivateKey = (privateKey, encryptedMsg) => {
    return crypto.privateDecrypt(privateKey, encryptedMsg)
}

const decryptWithPublicKey = (publicKey, encryptedMsg) => {
    return crypto.publicDecrypt(publicKey, encryptedMsg)
}

module.exports = {decryptWithPrivateKey, decryptWithPublicKey}