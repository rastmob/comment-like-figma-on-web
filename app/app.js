const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const routeManager = require('./route/route.manager.js')
const bodyParser = require('body-parser')
const db = require("./models/index")
const cors = require('cors')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        "status"     : 500,
        "message"    : "Bir şey oldu",
        "error"      : err.message,
    });

});



db.sequelize.sync()
    .then(() => {
        console.log("sync db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

routeManager(app)


app.listen(process.env.PORT || 4444);