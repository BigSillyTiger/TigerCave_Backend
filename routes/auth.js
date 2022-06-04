const router = require("express").Router();
const utils = require("../utils");
const { authMW } = require("../middleware").auth;
const { User } = require("../database/models/user");
const homeController = require("../controllers/homepage");
const authController = require("../controllers/authController");
const logs = require("../config/logs");

router.post("/adminlogin", (req, res, next) => {
    logs.infoLog("receive admin login req");
    authController.login(req, res);
});

router.get("/checkAuth", authMW, (req, res, next) => {
    //res.send(controller.protectedRouter(true))
    res.status(200).json({ success: true });
});

router.get("/adminlogout", (req, res, next) => {
    authController.logout(req, res);
});

router.post("/api/login", (req, res, next) => {
    console.log("---> ", req.body);
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    success: true,
                    msg: "Could not find the user.",
                });
            }
            const isValid = utils.pw.verifyPassword(
                req.body.password,
                user.hash,
                user.salt
            );
            if (isValid) {
                const tokenObj = utils.jwt.issueJWT(user);
                res.status(200).json({
                    success: true,
                    token: tokenObj.token,
                    expiresIn: tokenObj.expires,
                });
            } else {
                res.status(401).json({
                    success: false,
                    msg: "You entered wrong loggin info.",
                });
            }
        })
        .catch((err) => {
            logs.errLog(err);
            next(err);
        });
});

router.post("/api/register", (req, res, next) => {
    const saltHash = utils.pw.genPassword(req.body.password);

    const newUser = new User({
        username: req.body.username,
        hash: saltHash.hash,
        salt: saltHash.salt,
        admin: true,
    });

    newUser
        .save()
        .then((user) => {
            logs.infoLog("--> db saved new user: ", user);
            const jwt = utils.jwt.issueJWT(user);
            res.json({
                success: true,
                user,
                token: jwt.token,
                expiresIn: jwt.expires,
            });
        })
        .catch((err) => console.log("--> db save new user error: ", err));

    //res.redirect('/login')
});

router.get("/", (req, res, next) => {
    res.send(homeController.homePage());
});

router.get("/api/login", (req, res, next) => {
    res.send(homeController.loginPage());
});

router.get("/api/register", (req, res, next) => {
    res.send(homeController.registerPage());
});

router.get("/protected-router", authMW, (req, res, next) => {
    res.send(homeController.protectedRouter(true));
});

router.get("/logout", (req, res, next) => {
    req.logOut();
    res.redirect("/protected-router");
});

router.get("/login-success", (req, res, next) => {
    res.send(homeController.loginS());
});

router.get("/login-failure", (req, res, next) => {
    res.send(homeController.loginF());
});

module.exports = router;
