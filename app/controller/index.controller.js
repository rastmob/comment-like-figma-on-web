const db = require("../models/index")

const helloMessage = async (req, res) => {


    res.send({
        "status" : 200,
        "message": "Şu an buradasınız.",
    })

}

module.exports = {
    helloMessage,

}