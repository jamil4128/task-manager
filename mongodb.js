// const mongodb = require("mongodb")
// const mongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require("mongodb")
const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)
const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Error! Connection failed")
    }
    const db = client.db(databaseName)
    //findOne

    // db.collection("Users").findOne({
    //     _id: new ObjectID("5f35f68a9c806f49505318c5")
    // }, (error, user) => {
    //     if (error) {
    //         return console.log("Unable to find")
    //     }
    //     console.log(user)

    // })

    //find

    // db.collection("Users").find({
    //     "name": "Jamil"
    // }).toArray((error, user) => {
    //     if (error) {
    //         return console.log("Unable to find")
    //     }
    //     console.log(user)
    // })
    // db.collection("Users").find({
    //     "name": "Jamil"
    // }).count((error, counts) => {
    //     if (error) {
    //         return console.log("Unable to find")
    //     }
    //     console.log(counts)
    // })

    // db.collection("Users").find({
    //     "completed": false
    // }).toArray((error, user) => {
    //     console.log(user)
    // })
    // db.collection("Users").findOne({
    //     _id: new ObjectID("5f373403b0536128d0461a58")
    // }, (error, task) => {
    //     if (error) {
    //         console.log("Unable to fetch id")
    //     }
    //     console.log(task)
    // })

    //UpdateOne

    // db.collection("Users").updateOne({
    //     _id: new ObjectID("5f35f3c9f92f3922fc49d0c7")
    // }, {
    //     $inc: {
    //         Roll: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //updateMany

    // db.collection("Users").updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //deletemany

    // db.collection("Users").deleteMany({
    //     age: 1
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    db.collection("Users").deleteOne({
        Roll: 11804128
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})
