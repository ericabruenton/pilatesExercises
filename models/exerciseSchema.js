const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({

    name: String,
    apparatus: String,
    level: String,
    description: String,
    signs_of_readiness: String,
    certifying_body: String
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;