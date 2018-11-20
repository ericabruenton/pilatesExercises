const express = require("express");
const router = express.Router();
const Exercises = require("../models/exerciseSchema.js");

router.get('/', async (req, res) => {
    try {
        const allExercises = await Exercises.find({});
        res.render("index.ejs", {
            "exercisesList": allExercises
        });
    } catch (err) {
        res.send(err);
    }
});

// CREATE route
router.post("/", (req, res) => {
    Exercises.create({
        name: req.body.name,
        apparatus: req.body.apparatus,
        level: req.body.level,
        description: req.body.description,
        signs_of_readiness: req.body.signs_of_readiness,
        certifying_body: req.body.certifying_body,

    }, (err, createdExercise) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(createdExercise)
            console.log(req.body.name, req.body.apparatus, req.body.level, req.body.description, req.body.signs_of_readiness, req.body.certifying_body)
            res.redirect("/exercises");
        }
    });
});

//NEW route
router.get("/new", async (req, res) => {
    try {
        const foundExercise = await Exercises.find({});
        res.render("new.ejs", {
            exercises: foundExercise,
        });
    } catch (err) {
        res.send(err);
    }
});

//EDIT route
router.get("/:id/edit", async (req, res) => {
    try {
        const foundExercise = await Exercises.findById(req.params.id);
        res.render("edit.ejs", {
            "exercisesList": foundExercise
        });
    } catch (err) {
        res.send(err);
    }
});

//SHOW route
router.get("/:id", async (req, res) => {
    try {
        const foundExercise = await Exercises.findById(req.params.id);
        console.log(foundExercise + "this is foundExercise")
        console.log(req.params.id + "this is req.params")

        res.render("show.ejs", {
            "exercisesList": foundExercise
        });
    } catch (err) {
        res.send(err);
    }
});

//Update Route
router.put("/:id", (req, res) => {
    Exercises.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            apparatus: req.body.apparatus,
            level: req.body.level,
            description: req.body.description,
            signs_of_readiness: req.body.signs_of_readiness,
            certifying_body: req.body.certifying_body
        },
        { new: true }, (err, updatedExercise) => {
            if (err) {
                res.send(err);
            } else {
                console.log(updatedExercise, "this is the updatedExercise")
                res.redirect("/exercises");
            }
        });
});


//create a delete route
router.delete("/:id", (req, res) => {
    Exercises.findByIdAndRemove(req.params.id, (err, deletedExercise) => {
        if (err) {
            console.log(err, "this is an error in delete")
            res.send(err);
        } else {
            console.log(deletedExercise, "this is deletedExercise in the delete route")
            res.redirect('/exercises');
        }
    });
});

module.exports = router;
