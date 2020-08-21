const express = require("express")
const Task = require("../model/task")
const router = express.Router()
const auth = require("../middleware/auth")

router.post("/tasks", auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/tasks", auth, async (req, res) => {
    try {
        //const task = await Task.find({ owner: req.user._id })
        await req.user.populate("tasks").execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(e)
    }
})
router.patch("/tasks/:id", async (req, res) => {
    const allowedUpdate = ["description", "completed"]
    const triedUpdate = Object.keys(req.body)
    const isUpdatable = triedUpdate.every((update) => {
        return allowedUpdate.includes(update)
    })
    if (!isUpdatable) {
        return res.status(400).send({ "error": "Cannot update this property" })
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        triedUpdate.forEach(update => {
            task[update] = req.body[update]
        })
        await task.save()
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(task)
    } catch (error) {
        res.retrun(400).send(error)
    }
})
router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.return(400).send(error)
    }
})

module.exports = router