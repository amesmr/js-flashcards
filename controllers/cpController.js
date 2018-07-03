const db = require("../models");


module.exports = {
    findAll: function(req, res) {
        db.Checkpoint
            .find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    findByCpNum: function(req, res) {
        let cpArray = req.params.number.split('')
        cpArray = cpArray.map(number => {return {checkpoint: parseInt(number)}})
        console.log(cpArray)
        db.Checkpoint
            .find({$or:cpArray})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
        
    },
    findBySubject: function() {

    }
}