const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckpointSchema = new Schema({
    cpName: String,
    cpNum: Number,
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Question"
        }
    ]
});

const Checkpoint = mongoose.model("Checkpoint", CheckpointSchema);

module.exports = Checkpoint;