require("../db/mongoose")
const Task = require("../model/task")

// Task.findByIdAndDelete("5f395f974457f3392cfe427f").then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(error)
// })

const taskDelete = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    const obj = {
        deletedTask,
        count
    }
    return obj
}

taskDelete("5f383037c7dbf548c413bad8").then(obj => {
    console.log(obj.deletedTask)
    console.log(obj.count)
}).catch((error) => {
    console.log(error)
})