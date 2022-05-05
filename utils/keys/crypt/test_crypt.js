const crypto = require('crypto')
const hash = crypto.createHash('sha256')
const fs = require('fs')
const encrypt = require('./encrypt')
const decrypt = require('./decrypt')

const data = {
    test: '12daf235df 1234 da 2341 n u rhvg8 12daf235df 1234 da 2341 n u rhvg8 12daf235df 1234 da 2341 n u rhvg8 12daf235df 1234 da 2341 n u rhvg8 12daf235df 1234 da 2341 n u rhvg8 12daf235df 1234 da 2341 n u rhvg8 12daf235df 1234 da 2341 n u rhvg8 12daf235df 1234 da 2341 n u rhvg8 '
}

const myData = JSON.stringify(data)
hash.update(myData)

const hashedData = hash.digest('hex')

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')

const signedMsg = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData)

console.log('t1 = ', hashedData)

const package = {
    algorithm: 'sha256',
    originalData: data,
    signedAndEncryptedData: signedMsg
}

// varify part

const decryptHash = crypto.createHash(package.algorithm)
const publicKey = fs.readFileSync(__dirname + '/id_rsa_public.pem', 'utf8')
const decryptMsg = decrypt.decryptWithPublicKey(publicKey, package.signedAndEncryptedData)

const decryptMsgHex = decryptMsg.toString()

console.log('t2 = ', decryptMsgHex)
