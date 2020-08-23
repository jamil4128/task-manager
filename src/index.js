const express = require("express")
const app = express()
const port = process.env.PORT || 3006
const userRouter = require("./routers/userRouter")
const taskRouter = require("./routers/taskRouter")

require("./db/mongoose")
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Listening to port ", port)
})

