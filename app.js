const express = require("express")
const logger = require("morgan")
const mongoose = require("mongoose")

const Pizza = require("./models/Pizza.model.js")
const Cook = require("./models/Cook.model.js")

const app = express()

const PORT = 3001



// Setup the request logger to run on each request
app.use(logger('dev'));

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());



//
// Connect to the DB
//

mongoose.connect("mongodb://127.0.0.1:27017/express-restaurant")
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error("Error connecting to mongo", err));



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



//
// Mount routes
//

app.use("/", require("./routes/pizza.routes.js"))
app.use("/", require("./routes/cook.routes.js"))



// Start listening for http requests...
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`)
})

