const router = require("express").Router()

const Drink = require("../models/Drink.model")



router.post("/drinks", (req, res, next) => {
    const newCook = req.body

    Cook.create(newCook)
        .then((cookFromDB) => {
            res.status(201).json(cookFromDB)
        })
        .catch(error => {
            console.log("Error creating a new cook in the DB...");
            console.log(error);
            res.status(500).json({ error: "Failed to create a new cook" });
        })
})



module.exports = router
