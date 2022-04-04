const router = require("express").Router()
const passport = require("passport")
const pwUtils = require("../utils/password")
const {User} = require("../config/db")
const { controller } = require("../controllers")
const isAuth = require('./authMiddle').isAuth
const isAdmin = require('./authMiddle').isAdmin


//
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login-failure', 
    successRedirect: '/login-success'
}))

router.post('/register', (req, res, next) => {
    const saltHash = pwUtils.genPassword(req.body.password)

    const newUser = new User({
        username: req.body.username,
        hash: saltHash.hash,
        salt: saltHash.salt,
        admin: true
    })

    newUser.save()
        .then(user => {
            console.log('--> db saved new user: ', user)
        })
        .catch(err => console.log('--> db save new user error: ', err)) 

    res.redirect('/login')
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

router.get('/protected-router', [isAuth, isAdmin], (req, res, next) => {
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