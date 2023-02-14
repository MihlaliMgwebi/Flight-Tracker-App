// DOM Manipulation
import './style.scss'
import { getAllStateVectors }  from './api.js'

const BASE_URL = "https://opensky-network.org/api/states/all?time="

getAllStateVectors( // Get all flights for input time and origin SA https://opensky-network.org/api/states/all?time=1677164400
    "get", 
    BASE_URL + "1677164400" // Thu Feb 23 2023 15:00:00 GMT+0000
)

export function getMap( LatLngArray = [-26.107567, 28.056702], zoomLevel = 13){
    var map = L.map('map-container').setView(LatLngArray, zoomLevel);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}

getMap()



// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

