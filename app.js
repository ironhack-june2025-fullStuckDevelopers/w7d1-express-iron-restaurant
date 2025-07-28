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

function sayHello1 (request, response, next) {
    console.log("hello world...")
    next()
}

function sayHello2 (request, response, next) {
    console.log("hello world 2...")
    next()
}

app.use("/", sayHello1)
app.use("/", sayHello2)


//
// How to create routes in Express:
// 
// - app.get(path, code)
// - app.get(path, function(a, b, c){})
// 

// GET /
app.get("/", function(request, response, next){
    console.log("we received a request for the Home page...")
    // response.send()
    response.sendFile(__dirname + "/views/home.html")
})


// GET /contact
app.get("/contact", function(request, response, next){
    // response.send()
    response.sendFile(__dirname + "/views/contact.html")
})


// GET /pizzas
app.get("/pizzas", function(request, response, next) {
    response.json(pizzasArr)
})





// Start listening for http requests...
app.listen(PORT, function() {
    console.log(`Our app is running on port ${PORT}`)
})

