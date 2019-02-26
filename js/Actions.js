const { By } =  require('selenium-webdriver')
const { promiseForBoolean, word } = require('./util.js')


async function sendComment (driver, keys) {
    const group = await driver.findElements(By.className('title'))
    for (let i of group) {
        const result = await i.getText()
        if (word(result, keys)) {
            console.log('查询到相关帖子，进入回复中...')
            await i.findElement(By.tagName('a')).click()
            await driver.findElement(By.className('comment_textarea')).sendKeys('asda牛逼啊大东')
            await driver.findElement(By.name('submit_btn')).click()
            await verificationCode(driver)
            console.log('发帖成功！！！')
            return
        }
    }
}

async function joinGroup (driver, url, message = '我想加入你们豆瓣小组... 可以嘛~~~') {
    let done = false
    driver.get(url)
    await driver.findElements(By.className('bn-join-group')).then(async found => {
        if (found.length > 0) {
            await driver.findElement(By.className('bn-join-group')).click().then( async () => {
                await driver.sleep(1000)
                const result = await hasElement(driver, 'joinform', 'id')
                if (result) {
                    await driver.findElement(By.id('message')).sendKeys(message)
                    await driver.findElement(By.name('send')).click()
                    done = true
                    return
                } else {
                    console.log('加入小组')
                }
            })
        } else {
            console.log('已经加入小组')
            return
        }
    })
    return done // done 为 true 的话说明有问题
}

async function verificationCode (driver) {
    let img = ''
    await driver.findElements(By.id('captcha_image')).then( found => {
        if (found == 0) {
            img = false
        } else {
            img = true
        }
    })
    while (img === true) {
        await driver.findElements(By.id('captcha_image')).then( found => {
            if (found == 0) {
                img = false
            } else {
                img = true
            }
        })
        await driver.sleep(1000)
    }
}

async function userLogin (driver, name, password) {
    await driver.findElement(By.id('form_email')).sendKeys(name)
    await driver.findElement(By.id('form_password')).sendKeys(password)
    await driver.findElement(By.className('bn-submit')).click()
    await driver.sleep(2000)
}

async function changePage (driver, nowPage) {
    console.log('换页')
    let done = false
    await driver.get(`https://www.douban.com/group/651509/discussion?start=${nowPage}`)
    await driver.findElements(By.className('title')).then( found => {
        if (found == 25) {
            done = false
        } else {
            done = true
        }
    })
    return done
}

async function hasElement (driver, name, id = 'className') {
    let element = By.className(name)
    if (id == 'id') {
        element = By.id(name)
    }
    let done = false
    await driver.findElements(element).then( found => {
        console.log(found)
        console.log('查找内部found')
        if (found == 0) {
            done = false
        } else {
            done = true
        }
    })
    return done
}

module.exports = {
    sendComment, //  进入一个页面 查看当前存在的词汇的帖子 然后发送回复
    joinGroup,
    verificationCode,
    userLogin,
    changePage
}
