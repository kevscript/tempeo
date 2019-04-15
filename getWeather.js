require('dotenv').config()

// import fetch dependency
const fetch = require('node-fetch');

// import api key
const key = process.env.OWM_API_KEY


function getWeather(lat, lon) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`)
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log('the error', err))
}

module.exports = {
  getWeather
}