let map;

// [Create custom Icons](https://leafletjs.com/examples/custom-icons/)
const arrivalIcon = L.icon({
  iconUrl: "assets/airplane-arrival.svg",
  iconSize: [30, 30],
});

const departureIcon = L.icon({
  iconUrl: "assets/airplane-departure.svg",
  iconSize: [30, 30],
});

export function createMap(
  latLngTuple = [-26.089863, 28.135071],
  zoomLevel = 0.5
) {
  map = L.map("app-main__map").setView(latLngTuple, zoomLevel);
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
  // add a marker to the map using the custom icon
  L.marker([flightDetails.LATITUDE, flightDetails.LONGITUDE], {
    icon: flightDetails.ON_GROUND ? arrivalIcon : departureIcon,
  })
    .addTo(map)
    .bindPopup(
      `Flight ${flightDetails.CALLSIGN} from ${flightDetails.ORIGIN_COUNTRY}`
    );
}
