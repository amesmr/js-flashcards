import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FlashcardSchema = new Schema({
    subject: String,
    question: String,
    answerArray: [Number],
    correctAnswerIndex: Number,
    checkpointNumber: Number
});

const Flashcard = mongoose.model("Flashcard", FlashcardSchema);

module.exports = Flashcard;