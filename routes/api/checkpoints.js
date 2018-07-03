const router = require("express").Router();
const cpController = require("../../controllers");

router.route("/")
    .get(cpController.findAll)
    .post()

module.exports = router;