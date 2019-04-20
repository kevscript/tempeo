Tempeo is a weather app I've built with JS for educational purposes.

It uses 3 APIs :
- [Leaflet.js](https://github.com/Leaflet/Leaflet), provides us with an interactive map
- [OpenWeatherMap](https://openweathermap.org/), serves the weather data
- [Algolia Places](https://github.com/algolia/places), which is an address autocomplete API

The main goal was to combine multiple APIs inside the same project.

## 1. Installation

  

- install dependencies :

   `npm install`

- create a `.env` file in the root directory of your project

- inside, store your OpenWeatherMap Api Key like this: 
`OWM_API_KEY=YOUR_KEY`
    
- create a `keys.js` file inside the public folder
- inside, create a config object and pass your Algolia keys:
   

      const config = {
        appId: 'yourAppId',
        apiKey: 'yourApiKey'
      }

  
  

## 2. Usage

- To run it on your local machine `npm run start`  or `yarn start`

- You should be able to:
	- drag and navigate the map to find your location
	- click on the map to display weather informations
	- type your location directly into the autocompletion search bar


*The application might be subject to changes for learning purposes*
