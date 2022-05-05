const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const logs = require('../config/logs')

const pubToken = path.join(__dirname, '../utils/keys', 'public_key.pem')
const PUB_KEY = fs.readFileSync(pubToken, 'utf8')

const authMiddleware = (req, res, next) => {
    const tokenParts = req.headers.authorization.split(' ')
    
    if(tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
        try {
            req.jwt = jwt.verify(tokenParts[1], PUB_KEY, {algorithms: ['RS256']})
            next()
        } catch(err) {
            logs.errLog(err)
            res.status(401).json({success: false, msg: "You are not authorized to visit this page."})
        }
    }
}


module.exports = {
    authMiddleware
}