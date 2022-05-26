const router = require("express").Router();
const { Roar } = require("../config/db");
const { authMW, adminMW } = require("../middleware").auth;
const Controllers = require("../controllers");
const logs = require("../config/logs");

const API_REQ_ROAR = "/roars";
const API_REQ_ROAR_ADMIN = "/admin/roars";

/* add a new roar */
router.post(API_REQ_ROAR, [authMW, adminMW], (req, res) => {
    Controllers.roarsController.addRoar(req, res);
});

/* archive a roar */
router.put(API_REQ_ROAR, [authMW, adminMW], (req, res) => {
    Controllers.roarsController.archiveRoar(req, res);
});

/* get all none archive roars */
router.get(API_REQ_ROAR, (req, res) => {
    Controllers.roarsController.getRoars(req, res, "Normal");
});

/* get all archive roars */
router.get(API_REQ_ROAR_ADMIN, (req, res) => {
    Controllers.roarsController.getRoars(req, res, "Archive");
});

/* delete a roar */
router.delete(`${API_REQ_ROAR}/:id`, [authMW, adminMW], (req, res, next) => {
    Controllers.roarsController.deleteRoar(req, res);
});

module.exports = router;
