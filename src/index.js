const express = require("express");
const User = require("./model/user")
require("./db/mongoose")
const app = express()
const port = process.env.PORT || 3006
app.use(express.json())
app.post("/users", (req, res) => {
    const user = new User(req.body)

    user.save().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.send(error)
    })
})
app.listen(port, () => {
    console.log("Listening to port ", port)
})