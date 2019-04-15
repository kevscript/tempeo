require('dotenv').config()

// import fetch dependency
const fetch = require('node-fetch');

// import api key
const key = process.env.OWM_API_KEY


function getPlace(place) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${key}`)
    .then(res => res.json())
    .then(res => {
        let weather = res
        return weather    
    })
    .catch(err => console.error(err))
}

module.exports = {
  getPlace
}
