const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
    name: String,
    level: String,
    apparatus: String,
    description: String,
    certifying_body: String
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;