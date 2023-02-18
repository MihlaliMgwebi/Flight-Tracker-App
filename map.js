// import * as assets from './assets
let map;

export function createMap(
  latLngTuple = [-26.089863, 28.135071], //
  zoomLevel = 0.5
) {
  map = L.map("map-container").setView(latLngTuple, zoomLevel);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  map.flyTo(latLngTuple, zoomLevel); //smoothly pan and zoom to a specific coordinate on the map.
}

export function moveMapToLatLng(latLngTuple) {
  map.flyTo(latLngTuple, 13); //smoothly pan and zoom to a specific coordinate on the map.
}

export function addMarkerToMap(flightDetails) {
  // [Custom Icons](https://leafletjs.com/examples/custom-icons/)
  // create a custom icon
  const myIcon = L.icon({
    iconUrl: `assets/airplane-${
      flightDetails.IS_ON_GROUND ? "arrival" : "departure"
    }.svg`,
    iconSize: [30, 30],
  });
  // add a marker to the map using the custom icon
  L.marker([flightDetails.LATITUDE, flightDetails.LONGITUDE], {
    icon: myIcon,
  })
    .addTo(map)
    .bindPopup(
      `Flight ${flightDetails.CALLSIGN} from ${flightDetails.ORIGIN_COUNTRY}`
    );
}
