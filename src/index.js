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

app.listen(port, () => {
    console.log("Listening to port ", port)
})

const Task = require("./model/task")
const User = require("./model/user")
// const main = async () => {
//     // const task = await Task.findById("5f3f24f95f772924b8e35574")
//     // await task.populate("owner").execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById("5f3f24d14252370d482c6ae0")
//     await user.populate("tasks").execPopulate()
//     console.log(user.tasks)

// }
// main()
