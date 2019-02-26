const webDriver =  require('selenium-webdriver')
const By = webDriver.By
const proxy = require('selenium-webdriver/proxy')

const getProxyURL = require('./js/Proxy.js')
const { promiseForBoolean, word } = require('./js/util.js')
const { sendComment, joinGroup, verificationCode, userLogin, changePage } = require('./js/Actions.js')
const { groupJoionGroup } = require('./js/GroupActions.js')
const dataBase = require('./js/database.js')

async function start (index = 0) {
    const resultProxyURL = await getProxyURL()
    console.log(resultProxyURL)
    const driver = new webDriver.Builder()
        .forBrowser('chrome')
        .setProxy(proxy.manual({http: resultProxyURL}))
        .build()
    let userList = await dataBase.select('usr')
    console.log(userList[0].phone)
    return
    /*    [
        'wu-youning@outlook.com',  // 13268600774
        '14748856650'
    ] */


    if (userList.length === index) {
        console.log('所有账号登陆完毕')
        driver.quit()
        return
    }
	await driver.get('https://www.douban.com/')
    await userLogin(driver, userList[index].phone, 'XinChao520')
    await verificationCode(driver)

    // 加入小组
    await groupJoionGroup(driver)
    driver.quit()
    start(index + 1)
    return

    for (let i = 0; i < 20; i++) {
        await sendComment(driver, ['失眠'])
        const done = await changePage(driver, 25 * (i + 1))
        if (done) {
            console.log('没有下一页了 所以结束')
            break
        }
    }
    // let source = await driver.getPageSource()
}

start()
