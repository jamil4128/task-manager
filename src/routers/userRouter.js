const express = require("express")
const User = require("../model/user")
const auth = require("../middleware/auth")
const router = express.Router()
const multer = require("multer")
const sharp = require("sharp")
const uploads = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error("File not supported"))
        }
        callback(undefined, true)
    }
})

router.post("/users", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.send(error)
    }
})
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.send(error)
    }
})
router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tok) => {
            return tok.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send("Logged out of all session")
    } catch (error) {
        res.status(500).send()

    }
})
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

router.patch("/users/me", auth, async (req, res) => {
    const allowedUpdates = ["name", "email", "password", "age"]
    const reqUpdates = Object.keys(req.body)
    const isupdatable = reqUpdates.every((update) => allowedUpdates.includes(update))
    if (!isupdatable) {
        return res.send({ "error": "Cannot update this property" })
    }
    try {
        reqUpdates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.send(500).send(error)
    }
})
router.post("/users/me/avatar", auth, uploads.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error("User profile not found")
        }
        res.set("content-Type", "image/png")
        res.send(user.avatar)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete("/users/me/avatar", auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send()
})
module.exports = router