const router = require("express").Router();
const { authMW, adminMW } = require("../middleware/auth");
const roarsController = require("../controllers/roarsController");

const API_REQ_ROAR = "/roars";
const API_REQ_ROAR_ADMIN = "/admin/roars";

/* add a new roar */
router.post(API_REQ_ROAR, [authMW], (req, res) => {
    roarsController.addRoar(req, res);
});

/* archive a roar */
router.put(API_REQ_ROAR, [authMW], (req, res) => {
    roarsController.archiveRoar(req, res);
});

/* get all none archive roars */
router.get(API_REQ_ROAR, (req, res) => {
    roarsController.getRoars(req, res, "Normal");
});

/* get all archive roars */
router.get(API_REQ_ROAR_ADMIN, (req, res) => {
    roarsController.getRoars(req, res, "Archive");
});

/* delete a roar */
router.delete(`${API_REQ_ROAR}/:id`, [authMW], (req, res) => {
    roarsController.deleteRoar(req, res);
});

module.exports = router;
