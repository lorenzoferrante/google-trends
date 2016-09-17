const request = require('request')
const fs = require('fs')
const path = require('path')
const GoogleNews = require('google-news')
let cheerio = require('cheerio')

let trendURL = 'http://hawttrends.appspot.com/api/terms/'
let gNews = new GoogleNews()
var track
const file_data = path.join(__dirname, 'data.json') 

// COUNTRY CODE:
// Italy    27
// USA       1

getNewsForQuery = (query) => {
    gNews.stream(query, (stream) => {
        stream.on(GoogleNews.DATA, (data) => {
            return console.log(data.title)
        })

        stream.on(GoogleNews.ERROR, (error) => {
            return console.log(error)
        })
    })
}

request(trendURL, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        fs.writeFile(file_data, body, (err) => {
            if (err) throw err
            console.log('File saved!')
            // Una volta scritto il file, posso leggerlo come JSON
            var content = fs.readFileSync(file_data)
            var data = JSON.parse(content)
            
            getNewsForQuery(data['27'][0])           
        })
    }
})
