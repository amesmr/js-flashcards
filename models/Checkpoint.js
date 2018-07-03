const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckpointSchema = new Schema({
  welcome: {
    String
  },
  number: {
    Number
  },
  quiz: {
      title: {
        type: "String"
      },
      questions: [{
        subjects: {
          type: [
            String
          ]
        },
        number: {
          type: Number
        },
        objectives: {
          type: String
        },
        question: {
          type: String
        },
        answers: {
          type: [
            String
          ]
        },
        answer: {
          type: Number
        },
      }]
    }
});

const Checkpoint = mongoose.model("Checkpoint", CheckpointSchema);

module.exports = Checkpoint;