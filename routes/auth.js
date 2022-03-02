const router = require("express").Router()
const passport = require("passport")
const pwUtils = require("../utils/password")
const dbConnection = require("../config/db")
const { controller } = require("../controllers")

const User = dbConnection.models.User

//

router.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login-success'}))

router.post('/register', (req, res, next) => {
    console.log('-> server register - post')
    console.log('-> body: ', req.body)

    const saltHash = pwUtils.genPassword(req.body.password)
    const salt = saltHash.salt
    const hash = saltHash.hash

    const newUser = new User({
        username: req.body.username,
        hash: saltHash.salt,
        salt: saltHash.hash
    })

    newUser.save()
        .then(user => {
            console.log('--> db saved new user: ', user)
        })
        .catch(err => console.log('--> db save new user error: ', err)) 

    res.redirect('/login')
})

router.get('/', (req, res, next) => {
    console.log('-> server home page /')
    res.send(controller.homePage())
})

router.get('/login', (req, res, next) => {
    console.log('-> server login - get')
    res.send(controller.loginPage())
})

router.get('/register', (req, res, next) => {
    console.log('-> server register - get')
    res.send(controller.registerPage())
})

router.get('/protected-router', (req, res, next) => {
    if(req.isAuthenticated()) {
        res.send(controller.protectedRouter(true))
    } else {
        res.send(controller.protectedRouter(false))
    }
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