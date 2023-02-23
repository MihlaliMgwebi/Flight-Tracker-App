import { getFirst20FlightDetails } from "./api.js";

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

// export function moveMapToLatLng(latLngTuple) {
//   map.flyTo(latLngTuple, 13); //smoothly pan and zoom to a specific coordinate on the map.
// }

//addMarkerToMap(flightDetails)
getFirst20FlightDetails(1677485168).subscribe((allFlights) =>
  allFlights.map((flight) => {
    if (flight.LATITUDE !== null && flight.LONGITUDE !== null)
      L.marker([flight.LATITUDE, flight.LONGITUDE], {
        icon: flight.ON_GROUND ? arrivalIcon : departureIcon,
      })
        .addTo(map)
        .bindPopup(`Flight ${flight.CALLSIGN} from ${flight.ORIGIN_COUNTRY}`);
  })
);
