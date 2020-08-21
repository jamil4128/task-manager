const express = require("express")
const app = express()
const port = process.env.PORT || 3006
const userRouter = require("./routers/userRouter")
const taskRouter = require("./routers/taskRouter")
require("./db/mongoose")
// app.use((req, res, next) => {
//     if (req.method === "GET") {
//         res.send("GET request disabled")
//     } else {
//         next()
//     }

// })
// app.use((req, res, next) => {
//     res.status(503).send("Request not available")
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




// const jwt = require("jsonwebtoken")
// const myFunction = async () => {
//     const token = jwt.sign({ _id: "abc123" }, "Thisismycourse", { "expiresIn": "1 sec" })
//     console.log(token)
//     const data = jwt.verify(token, "Thisismycourse")
//     console.log(data)
// }
// myFunction()
app.listen(port, () => {
    console.log("Listening to port ", port)
})

