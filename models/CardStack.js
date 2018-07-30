const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardStackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Flashcard",
    },
  ],
});

const CardStack = mongoose.model("CardStack", CardStackSchema);

module.exports = CardStack;
