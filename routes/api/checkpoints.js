const router = require("express").Router();
const cpController = require("../../controllers/cpController");

router.route("/")
  .get(cpController.findAll);
    
router.route("/:number")
  .get(cpController.findByCpNum);

router.route("/sort/:subject")
  .get(cpController.findBySubject);  
    
router.route("/:number/:subject")
  .get(cpController.findBySubjectAndNum);

router.route("/null/null/subjects")
  .get(cpController.findAllSubjects);
module.exports = router;