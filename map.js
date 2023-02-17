// import * as assets from './assets
let map;
export function showMap(
  LatLngArray = [-26.089863, 28.135071],
  zoomLevel = 0.5
) {
  map = L.map("map-container").setView(LatLngArray, zoomLevel);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

export function addMarkerToMap(FlightDetails) {
  // [Custom Icons](https://leafletjs.com/examples/custom-icons/)
  // create a custom icon
  var myIcon = L.icon({
    iconUrl: `assets/airplane-${
      FlightDetails.IS_ON_GROUND ? "arrival" : "departure"
    }.svg`,
    iconSize: [30, 30],
  });
  // add a marker to the map using the custom icon
  var marker = L.marker([FlightDetails.LONGITUDE, FlightDetails.LATITUDE], {
    icon: myIcon,
  })
    .addTo(map)
    .bindPopup(
      `Flight ${FlightDetails.CALLSIGN} from ${FlightDetails.ORIGIN_COUNTRY}`
    );
}
