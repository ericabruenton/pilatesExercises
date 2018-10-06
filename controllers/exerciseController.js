const express = require("express");
const router = express.Router();
const Exercises = require("../models/exerciseSchema.js");//schema

router.get('/', (req, res) => {
    Exercises.find({}, (err, allExercises) => {
        if (err) {
            res.send(err);
        } else {
            res.render("index.ejs", {
                "exercisesList": allExercises
            })
        }
    });
});

// POST route this is the route that the form is sending its info to (the CREATE route) request object is information being sent to the server
// contents of the form will be in req.body
router.post("/", (req, res) => {

    //CREATE "router" goes above the NEW route
    Exercises.create(req.body, (err, createdExercise) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(createdExercise)
            res.redirect("/exercises");
        }
    });
});

//NEW route
router.get("/new", (req, res) => {
    res.render("new.ejs");
});

//EDIT route
router.get("/:id/edit", (req, res) => {
    Exercises.findById(req.params.id, (err, foundExercise) => {
        res.render("edit.ejs", {
            "exercisesList": foundExercise
        });
    });
});

//SHOW route
router.get("/:id", (req, res) => {
    console.log("**show route**")
    Exercises.findById(req.params.id, (err, foundExercise) => {
        if (err) {
            console.log(err)
        }
        res.render("show.ejs", {
            "exercisesList": foundExercise
        });
    });
});

router.put("/:id", (req, res) => {
    Exercises.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedExercise) => {
        if (err) {
            res.send(err);
        } else {
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
