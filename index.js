const request = require('request')
const fs = require('fs')
let cheerio = require('cheerio')
let trendURL = 'http://hawttrends.appspot.com/api/terms/'

// COUNTRY CODE:
// Italy    27
// USA       1

request(trendURL, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        fs.writeFile('res.json', body, (err) => {
            if (err) throw err
            console.log('File saved!')
            // Una volta scritto il file, posso leggerlo come JSON
            var content = fs.readFileSync('res.json')
            var data = JSON.parse(content)

            console.log(data['27'])
        })
    }
})
