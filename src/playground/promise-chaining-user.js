require("../db/mongoose")
const User = require("../model/user")

// User.findByIdAndUpdate("5f395adadeaae3019473617f", { name: "Maruf" }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ name: "Jamil" })
// }).then(result => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateUser = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age: age })
    const obj = {
        user: user,
        count: count
    }
    return obj


}

updateUser("5f395adadeaae3019473617f", 2).then((obj) => {
    console.log(obj.count)
    console.log(obj.user)
}).catch((error) => {
    console.log(error)
})

