import L from "leaflet";

const map = L.map("app-main__map").setView([-26.089863, 28.135071], 13);

export function createMap(
    latLngTuple: [number, number] = [-26.089863, 28.135071],
    zoomLevel = 0.5
) {

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    map.flyTo(latLngTuple, zoomLevel); //smoothly pan and zoom to a specific coordinate on the map.
    map.invalidateSize();
}

// export function moveMapToLatLng(latLngTuple) {
//     map.flyTo(latLngTuple, 13); //smoothly pan and zoom to a specific coordinate on the map.
//     map.invalidateSize();
// }

// export function addMarkerToMap(flightDetails) {
//     // add a marker to the map using the custom icon
//     L.marker([flightDetails.LATITUDE, flightDetails.LONGITUDE], {
//         icon: flightDetails.ON_GROUND ? arrivalIcon : departureIcon,
//     })
//         .addTo(map)
//         .bindPopup(
//             `Flight ${flightDetails.CALLSIGN} from ${flightDetails.ORIGIN_COUNTRY}`
//         );
// }
