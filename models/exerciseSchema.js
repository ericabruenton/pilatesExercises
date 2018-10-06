const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({

    apparatus: String,
    level: String,
    name: String,
    description: String,
    certifying_body: String
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;