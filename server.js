const express = require('express')
const app = express()
const port = process.env.PORT || 1337

const bodyParser = require('body-parser')

const weather = require('./getWeather')
const place = require('./getPlace')

app.listen(port, console.log(`listening on port ${port}`))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/api/owm/:lat/:lon', (req, res) => {
  weather.getWeather(req.params.lat, req.params.lon)
    .then(data => res.json(data))
    .catch(err => console.error('the error is', err))
})

app.get('/api/place/:place', (req, res) => {
  place.getPlace(req.params.place)
    .then(data => res.json(data))
})