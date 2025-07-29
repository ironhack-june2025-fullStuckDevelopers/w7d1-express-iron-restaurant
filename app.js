const express = require("express")
const logger = require("morgan")

const pizzasArr = require("./data/pizzas.js")

const app = express()

const PORT = 3001



// Setup the request logger to run on each request
app.use(logger('dev'));

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());



//
// Examples of custom middleware
//

function sayHello1 (req, res, next) {
    console.log("hello world...")
    next()
}

function sayHello2 (req, res, next) {
    console.log("hello world 2...")
    next()
}

app.use("/", sayHello1)
app.use("/", sayHello2)


//
// Routes...
// 

// GET /
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/views/home.html")
})


// GET /contact
app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + "/views/contact.html")
})


// GET /pizzas
// GET /pizzas?maxPrice=xx
app.get("/pizzas", (req, res, next) => {

    const { maxPrice } = req.query

    // if maxPrice is undefined, return an array with all the pizzas
    if(maxPrice === undefined) {
        res.json(pizzasArr)
        return
    }

    // if we have maxPrice, then we return only the pizzas with that maxPrice
    const filteredPizzas = pizzasArr.filter((pizzaObj) => {
        return pizzaObj.price <= parseFloat(maxPrice);
    })

    res.json(filteredPizzas)
})



// GET /pizzas/xxx
app.get("/pizzas/:pizzaId", (req, res, next) => {

    let { pizzaId } = req.params // note: we get pizzaId as a string

    pizzaId = parseInt(pizzaId) // convert to an integer

    const result = pizzasArr.find((pizzaObj, i, arr) => {
        return pizzaObj.id === pizzaId
    })

    res.json(result)
})



// Start listening for http requests...
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`)
})

