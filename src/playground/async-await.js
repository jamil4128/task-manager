const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject("Input cannot be negative")
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(1, -2)
    const sum1 = await add(sum, 3)
    const sum2 = await add(sum1, 8)
    return sum2
}

doWork().then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
// add(1, 2).then((result) => {
//     console.log(result)
//     return add(result, 6)
// }).then((rx) => {
//     console.log(rx)
//     return add(rx, 4)
// }).then((re) => {
//     console.log(re)
// }).catch((e) => {
//     console.log(e)
// })