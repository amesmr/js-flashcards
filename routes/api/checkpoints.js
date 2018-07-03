const router = require("express").Router();
const cpController = require("../../controllers/cpController");

router.route("/")
    .get(cpController.findAll)
    
router.route("/:number")
    .get(cpController.findByCpNum)

router.route("/:number/subject")
    .get(cpController.findBySubject)    
module.exports = router;