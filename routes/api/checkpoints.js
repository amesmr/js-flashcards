const router = require("express").Router();
const cpController = require("../../controllers/cpController");

router.route("/")
    .get(cpController.findAll)
    

module.exports = router;