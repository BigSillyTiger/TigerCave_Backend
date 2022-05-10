const router = require("express").Router()
const utils = require("../utils")
const authMW = require("../middleware").auth
const {User} = require("../config/db")
const { controller } = require("../controllers")
const {isAuth, isAdmin} = require('./authMiddle')
const logs = require('../config/logs')

router.post('/adminlogin', (req, res, next) => {
    logs.infoLog('receive admin login req')
    console.log('-> cookies: ', req.cookies)
    User.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                res.status(401).json({success: true, msg: 'Could not find the user.'})
            }
            const isValid = utils.pw.verifyPassword(req.body.password, user.hash, user.salt)
            if(isValid) {
                const tokenObj = utils.jwt.issueJWT(user)
                res.cookie('login', tokenObj.token, {
                    maxAge: tokenObj.expires, 
                    httpOnly: true,
                })
                res.status(200).json({success: true})
            } else {
                res.status(401).json({success: false, msg: 'You entered wrong loggin info.'})
            }
        })
        .catch(err => {
            logs.errLog(err)
            next(err)
        })
})

router.get('/checkAuth', authMW.authMiddleware, (req, res, next) => {
    //res.send(controller.protectedRouter(true))
    res.status(200).json({success: true})
})

router.get('/adminlogout', (req, res, next) => {
    res.clearCookie('login')
    res.status(200).json({note: 'successfully logout'})
})


router.post('/login', (req, res, next) => {
    console.log("---> ", req.body)
    User.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                res.status(401).json({success: true, msg: 'Could not find the user.'})
            }
            const isValid = utils.pw.verifyPassword(req.body.password, user.hash, user.salt)
            if(isValid) {
                const tokenObj = utils.jwt.issueJWT(user)
                res.status(200).json({success: true, token: tokenObj.token, expiresIn: tokenObj.expires})
            } else {
                res.status(401).json({success: false, msg: 'You entered wrong loggin info.'})
            }
        })
        .catch(err => {
            logs.errLog(err)
            next(err)
        })
})

router.post('/register', (req, res, next) => {
    const saltHash = utils.pw.genPassword(req.body.password)

    const newUser = new User({
        username: req.body.username,
        hash: saltHash.hash,
        salt: saltHash.salt,
        admin: true
    })

    newUser.save()
        .then(user => {
            logs.infoLog('--> db saved new user: ', user)
            const jwt = utils.jwt.issueJWT(user)
            res.json({
                success: true,
                user,
                token: jwt.token,
                expiresIn: jwt.expires
            })
        })
        .catch(err => console.log('--> db save new user error: ', err)) 

    //res.redirect('/login')
})

router.get('/', (req, res, next) => {
    res.send(controller.homePage())
})

router.get('/login', (req, res, next) => {
    res.send(controller.loginPage())
})

router.get('/register', (req, res, next) => {
    res.send(controller.registerPage())
})

/* router.get('/protected-router', [isAuth, isAdmin], (req, res, next) => {
    res.send(controller.protectedRouter(true))
}) */

router.get('/protected-router', authMW.authMiddleware, (req, res, next) => {
    res.send(controller.protectedRouter(true))
})

router.get('/logout',(req, res, next) => {
    req.logOut()
    res.redirect('/protected-router')
})

router.get('/login-success', (req, res, next) => {
    res.send(controller.loginS())
})

router.get('/login-failure', (req, res, next) => {
    res.send(controller.loginF())
})

module.exports = router