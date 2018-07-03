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
    findBySubject: function(req, res) {
        db.Checkpoint
            .find({})
            .then(data => {
                let quizArray = [];
                data.forEach(checkpoint => {
                    quizArray.push(checkpoint.quiz.questions)
                })
                // res.json(quizArray)
                let questionArray = []
                quizArray.forEach(quiz => {
                    
                    quiz.forEach(question => {
                        questionArray.push(question)
                    })
                })
                // res.json(questionArray)
                questionArray.forEach(question => {
                    console.log(question.subjects)
                })
                let results = questionArray.filter(question => 
                        question.subjects.includes("`vocab`")
                )

                res.json(results)
                
            })
            .catch(err => res.status(422).json(err))
    }
}