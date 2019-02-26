const request = require('request')

function getProxyURL () {
    const options = {
        method: 'GET',
        uri: 'http://api.xdaili.cn/xdaili-api//greatRecharge/getGreatIp',
        timeout: 10000,
        qs: {
            spiderId: '063d2cfdfbc04828a118b835b2672273',
            orderno: 'YZ2018879339OSSSZ4',
            returnType: 2,
            count: 1
        },
        gzip: true
    }
    return new Promise((resolve, reject) => {
        const req = request(options, (error, response) => {
            const jsonResult = JSON.parse(response.body)
            if (jsonResult.ERRORCODE === '0' && jsonResult.RESULT && jsonResult.RESULT.length > 0) {
                const httpurl = jsonResult.RESULT[0].ip + ':' + jsonResult.RESULT[0].port
                resolve(httpurl)
            } else {
                reject('error')
            }
        })
    })

}

module.exports = getProxyURL
