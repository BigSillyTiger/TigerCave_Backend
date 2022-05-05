const crypto = require("crypto")
const log = require('../config/logs')

const genPassword = (pw) => {
    let salt = crypto.randomBytes(32).toString('hex')
    let genHash = crypto.pbkdf2Sync(pw, salt, 10000, 64, 'sha512').toString('hex')
    
    return {
        salt: salt,
        hash: genHash
    }
}

const verifyPassword = (pw, hash, salt) => {
    log.infoLog('call varifyPW')
    let hashVarify = crypto.pbkdf2Sync(pw, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVarify
}

module.exports = {
    genPassword,
    verifyPassword
}