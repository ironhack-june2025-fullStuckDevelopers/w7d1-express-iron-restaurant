const router = require("express").Router()

const Pizza = require("../models/Pizza.model");


// POST /pizzas -- Create a new pizza
router.post("/pizzas", (req, res, next) => {

    const newPizza = req.body;

    Pizza.create(newPizza)
        .then((pizzaFromDB) => {
            res.status(201).json(pizzaFromDB)
        })
        .catch((err) => {
            console.log("Error creating a new pizza in the DB...")
            console.log(err)
            res.status(500).json({ error: "Failed to create a new pizza" })
        })
})


// GET /pizzas -- Get the list of pizzas
// GET /pizzas?maxPrice=20
router.get("/pizzas", (req, res, next) => {

    const { maxPrice } = req.query

    let filter = {}

    if (maxPrice !== undefined) {
        filter = { price: { $lte: maxPrice } }
    }

    Pizza.find(filter)
        .populate("cook")
        .then((pizzasFromDB) => {
            res.json(pizzasFromDB)
        })
        .catch(err => {
            console.log("Error getting pizzas from DB...")
            console.log(err)
            res.status(500).json({ error: "Failed to get list of pizzas" })
        })
})


// GET /pizzas/:pizzaId -- Get the details for one pizza
router.get("/pizzas/:pizzaId", (req, res, next) => {

    const { pizzaId } = req.params

    Pizza.findById(pizzaId)
        .populate("cook")
        .then((pizzaFromDB) => {
            res.json(pizzaFromDB)
        })
        .catch(error => {
            console.log("Error getting pizza details from DB...");
            console.log(error);
            res.status(500).json({ error: "Failed to get pizza details" });
        })
})


// PUT /pizzas/:pizzaId -- Update one pizza
router.put("/pizzas/:pizzaId", (req, res, next) => {

    const { pizzaId } = req.params

    const newDetails = req.body

    Pizza.findByIdAndUpdate(pizzaId, newDetails, { new: true })
        .then((pizzaFromDB) => {
            res.json(pizzaFromDB)
        })
        .catch((error) => {
            console.error("Error updating pizza...");
            console.error(error);
            res.status(500).json({ error: "Failed to update a pizza" });
        })

})


// DELETE /pizzas/:pizzaId -- Delete one pizza
router.delete("/pizzas/:pizzaId", (req, res, next) => {

    const { pizzaId } = req.params

    Pizza.findByIdAndDelete(pizzaId)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            console.error("Error deleting pizza...");
            console.error(error);
            res.status(500).json({ error: "Failed to delete a pizza" });
        })
})



module.exports = router;