const db = require("../models");


module.exports = {
    findAll: function(req, res) {
        db.Checkpoint
            .find({})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err))
    },
    findByCpNum: function(req, res) {
        let cpArray = req.params.number.split('+')
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
                // Takes the data and through multiple steps breaks the path down into a more usable JSON response for the application
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
    },

    findAllSubjects: function(req,res) {
        db.Checkpoint
            .find({})
            .then(data => {
                // Takes the data and through multiple steps breaks the path down into a more usable JSON response for the application
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
                
                let subjectArray = []
                questionArray.forEach(question => {
                    subjectArray.push(question.subjects)
                })
                let subjectList = []
                subjectArray.forEach(list => {
                    for(let i = 0; i < list.length; i++) {
                        // if(subjectList.indexOf(list[i]) < 0) {
                        //     subjectList.push(list[i])
                        // }
                        subjectList.push(list[i])
                    }
                })
                let subjMap = {};
                for (let subject of subjectList) {
                    subjMap[subject] = subjMap[subject] + 1 || 1;
                }

                // res.json(subjMap)
                let refinedSubjectList = [];
                for (let subj in subjMap) {
                    if (subjMap[subj] > 1) {
                        refinedSubjectList.push(subj + ' ' + subjMap[subj])
                    }
                }

                res.json(refinedSubjectList)
            })
            .catch(err => {
                res.json(err)
            })
                
    }
}