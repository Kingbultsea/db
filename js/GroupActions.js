const { sendComment, joinGroup, verificationCode, userLogin, changePage } = require('./Actions.js')

async function groupJoionGroup (driver) {
    let group = [
        'cdch',
        '34020',
        'weifang',
        'minimalists',
        '586674',
        'taotaopaoxiao',
        'haixiuzu',
        'in-shanghai'
    ]
    for (let i of group) {
        await joinGroup(driver, `https://www.douban.com/group/${i}/`)
        await driver.sleep(2000)
    }
    console.log('完成小组加入')
    return
}


module.exports = {
    groupJoionGroup
}
