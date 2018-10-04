const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require("./db/db");


//middleware bodyParser allows us to read the contents of a form
app.use(bodyParser.urlencoded({ extended: false }));
//middleware methodOverride allows us to take actions (DELETE/POST)
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log("go girl");
    next();
});
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

const exerciseController = require("./controllers/exerciseController");
app.use("/exercises", exerciseController);

app.listen(PORT, () => {
    console.log("10 - 4 on 3000.")
});