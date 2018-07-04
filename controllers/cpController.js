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
        let subjectArray = req.params.subject.split('+')
        
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
                let results = questionArray.filter(question => 
                        question.subjects.includes(subjectArray[0])  
                        || question.subjects.includes(subjectArray[1]) 
                        || question.subjects.includes(subjectArray[2])
                )

                res.json(results)
                
            })
            .catch(err => res.status(422).json(err))
    },

    findBySubjectAndNum: function(req,res) {
        let subjectArray = req.params.subject.split('+')
        let cpArray = req.params.number.split('+')
        cpArray = cpArray.map(number => {return {checkpoint: parseInt(number)}})
        console.log(cpArray)
        db.Checkpoint
            .find({$or:cpArray})
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
                let results = questionArray.filter(question => 
                        question.subjects.includes(subjectArray[0])  
                        || question.subjects.includes(subjectArray[1]) 
                        || question.subjects.includes(subjectArray[2])
                )

                res.json(results)
                
            })
            .catch(err => res.status(422).json(err));
    }
}