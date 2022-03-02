const crypto = require("crypto")

const genPassword = (pw) => {
    let salt = crypto.randomBytes(32).toString('hex')
    let genHash = crypto.pbkdf2Sync(pw, salt, 10000, 64, 'sha512').toString('hex')
    
    return {
        salt: salt,
        hash: genHash
    }
}

const varifyPassword = (pw, hash, salt) => {
    let hashVarify = crypto.pbkdf2Sync(pw, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVarify
}

module.exports = {
    genPassword,
    varifyPassword
}