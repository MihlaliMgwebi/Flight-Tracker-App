import L from "leaflet";


export function createMap(
) {
    const mapContainer = document.getElementById('app-main__map');
    if (!mapContainer) return

    const map = L.map(mapContainer).setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.invalidateSize();
}

// export function moveMapToLatLng() {
//     map.flyTo(latLngTuple, 13); //smoothly pan and zoom to a specific coordinate on the map.
//     map.invalidateSize();
// }
