const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlashcardSchema = new Schema({
  front: {
    type: String,
    required: true,
  },

  back: {
    type: String,
    required: true,
  },

  stack: {
    type: Schema.Types.ObjectId,
    ref: "CardStack",
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Flashcard = mongoose.model("Flashcard", FlashcardSchema);

module.exports - Flashcard;