// DOM objects
const contentWeather = document.querySelector(".content-weather");
const placesInput = document.getElementById("places-input");

// Algolia autocomplete
const placesAutocomplete = places({
  appId: config.appId,
  apiKey: config.apiKey,
  container: document.querySelector("#places-input"),
  language: "en",
  aroundLatLngViaIP: false
});

// initialize places coordinates
let placesCoords = {}

// set view on default location (london)*/
let map = L.map("map").setView([51.505, -0.09], 13);

let marker = L.marker([51.5, -0.09]).addTo(map);

// init map Layer
L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
  maxZoom: 10,
  minZoom: 4
}).addTo(map);

// print data
function showData(data) {
  contentWeather.textContent = "";
  const div = document.createElement("div");
  contentWeather.appendChild(div);

  div.outerHTML = `<div class="content-weather">
  <li>
    <div class="weather-graph">
      <div>
        <img src="./images/${data.weather[0].icon || ""}.svg"/>
      </div>
      <span>${Math.round(data.main.temp) || ""}°C</span>
    </div>
    <h5>Weather</h5>
    ${data.weather[0].description || ""}
  </li>
  <li>
    <h5>Location</h5>
    ${data.name || ""}, ${data.sys.country || ""}
  </li>
  <li>
    <h5>Wind Speed</h5>
    ${parseInt(data.wind.speed * 3) || ""} km/h
  </li>
  <li>
    <h5>Humidity</h5>
    ${data.main.humidity || ""} %
  </li>
  <li>
    <h5>Pressure</h5>
    ${data.main.pressure || ""} atm
  </li>
  <li>
    <h5>Sunrise</h5>
    ${new Date(data.sys.sunrise * 1000).toTimeString().substring(0, 8)}
  </li>
  <li>
    <h5>Sunset</h5>
    ${new Date(data.sys.sunset * 1000).toTimeString().substring(0, 8)}
  </li>
</div>`;
}

// get position of click to set a new marker and display position
function onMapClick(e) {
  //temporary fix for searchbar value popping (?)
  placesInput.value = "";

  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  if (marker) {
    map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }

  fetch(`/api/owm/${lat}/${lng}`)
    .then(res => res.json())
    .then(data => showData(data))
    .catch(err => console.log("error", err));
}

// initial window load
function onWindowLoad() {
  fetchWeatherByCoords(51.5, -0.09)
}

// put marker on map after search input sumbittion
function showMapCoord(lat, lng) {
  if (marker) {
    map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }

  let coords = [marker.getLatLng()];
  let markerBounds = L.latLngBounds(coords);
  map.fitBounds(markerBounds);
}


function fetchWeatherByCoords(lat, lng) {
  fetch(`/api/owm/${lat}/${lng}`)
  .then(res => res.json())
  .then(data =>  {
    showData(data)
    showMapCoord(data.coord.lat, data.coord.lon);
  })
  .catch(err => console.log("error", err));
}

// EVENT LISTENERS
window.addEventListener("load", onWindowLoad);
map.addEventListener("click", onMapClick);

placesAutocomplete.on('change', async (e) => {
  placesCoords = e.suggestion.latlng
  return await fetchWeatherByCoords(placesCoords.lat, placesCoords.lng)
})
