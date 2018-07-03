const db = require("../models");


module.exports = {
    findAll: function() {
        db.Checkpoint
            .find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    findByCpNum: function() {
        
    },
    findBySubject: function() {

    }
}