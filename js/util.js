
function promiseForBoolean (obj = {}) {
    let interval; let promise; let save = {}
    Object.assign(save, obj)
    const func = (resolve) => {
        if (obj.boolean === !save.boolean) {
            clearInterval(interval)
            resolve()
        }
    }
    promise = new Promise((resolve, reject) => {
        interval = setInterval(func.bind(null, resolve), 1000)
    })
    return promise
}

function word (target, group = []) {
    let result = true
    console.log('词汇查询 ' + target)
    group.forEach(data => {
        if (target.indexOf(data) === -1) {
            console.log('当前没有词汇匹配')
            return result = false
        }
    })
    return result
}

module.exports = {
    promiseForBoolean,
    word
}
