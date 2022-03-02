const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { User } = require("../config/db")
const { varifyPassword } = require("../utils/password")

const varifyCB = (username, password, done) => {
    User.findOne({username: username})
        .then(user => {
            if(!user) {
                return done(null, false)
            } 
            const isValid = varifyPassword(password, user.hash, user.salt)
            if(isValid) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err => {
            done(err)
        })
}

const strategy = new LocalStrategy(varifyCB)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userID, done) => {
    User.findById(userID)
        .then(user => {
            done(null, user)
        })
        .catch(err => done(err))
})