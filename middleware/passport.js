const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const dbConnection = require("../config/db")
const { varifyPassword } = require("../utils/password")

const Users = dbConnection.model.User

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
}

const varifyCB = (username, password, cb) => {
    console.log('===> server varify cb: ', username, password)
    Users.findOne({username: username})
        .then(user => {

            if(!user) {
                return cb(null, false)
            } 
            const isValid = varifyPassword(password, user.hash, user.salt)
            if(isValid) {
                return cb(null, user)
            } else {
                return cb(null, false)
            }
        })
        .catch(err => {
            cb(err)
        })
}

const strategy = new LocalStrategy(customFields, varifyCB)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userID, done) => {
    Users.findById(userID)
        .then(user => {
            done(null, user)
        })
        .catch(err => done(err))
})

//module.exports = passport