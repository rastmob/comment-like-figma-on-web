const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const routeManager = require('./route/route.manager.js')
const bodyParser = require('body-parser')
const db = require("./models/index")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));



db.sequelize.sync()
    .then(() => {
        console.log("sync db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

routeManager(app)


app.listen(process.env.PORT)