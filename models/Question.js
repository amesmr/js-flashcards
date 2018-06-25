const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: String,
    choices: [String],
    answer: Number,
    tags: [String],
    lesson: String,
    goal: String
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;

