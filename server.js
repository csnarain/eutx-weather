const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const apiKey = '768db272f6729448897e2593a51e90d7'

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    //Modified Comments
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, (err, response, body) => {
        if (err) {
            res.render('index', {
                weather: null,
                error: 'Error, please try again'
            });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', {
                    weather: null,
                    error: 'Error, please try again'
                })
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {
                    weather: weatherText,
                    error: null
                })
            }
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port`)
})