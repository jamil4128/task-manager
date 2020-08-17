const express = require("express")
const User = require("../model/user")
const router = express.Router()
router.post("/users", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.send(error)
    }
})
router.get("/users", async (req, res) => {
    try {
        const userFind = await User.find({})
        res.send(userFind)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/users/:id", async (req, res) => {
    const ids = req.params.id
    try {
        const users = await User.findById(ids)
        if (!users) {
            return res.status(404).send()
        }
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch("/users/:id", async (req, res) => {
    const allowedUpdates = ["name", "email", "password", "age"]
    const reqUpdates = Object.keys(req.body)
    const isupdatable = reqUpdates.every((update) => allowedUpdates.includes(update))
    if (!isupdatable) {
        return res.send({ "error": "Cannot update this property" })
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.send(400).send(error)
    }
})

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send
        }
        res.send(user)
    } catch (error) {
        res.send(500).send(error)
    }
})
module.exports = router