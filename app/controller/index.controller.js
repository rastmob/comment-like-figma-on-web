const db = require("../models/index")

const helloMessage = async (req, res) => {


    res.send({
        "status" : 200,
        "message": "Hello Rastmobile Team From Malatya :)",
    })

}

module.exports = {
    helloMessage,

}