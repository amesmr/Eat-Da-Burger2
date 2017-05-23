var express = require("express");
var router = express.Router();

// Import the model (burgers.js) to use its database functions.
var burgers = require("../models/burgers.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burgers.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function (req, res) {
    burgers.insertOne([
        "burger_name", "devoured"
    ], [
            req.body.burger_name, 0
        ], function () {
            res.redirect("/");
        });
});

router.put("/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    // console.log("condition", condition);
    var val = parseInt(req.body.devoured);
    burgers.updateOne({
        devoured: val
    }, condition, function () {
        res.redirect("/");
    });
});


// Export routes for server.js to use.
module.exports = router;
