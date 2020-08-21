const jwt = require("jsonwebtoken")
const User = require("../model/user")
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, "Thisismycourse")
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token })
        //console.log(user)
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate" })
    }

}
module.exports = auth