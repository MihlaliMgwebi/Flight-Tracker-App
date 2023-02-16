let map;
export function showMap(LatLngArray = [-26.089863, 28.135071], zoomLevel = 13) {
  map = L.map("map-container").setView(LatLngArray, zoomLevel);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

export function addMarkerToMap(LatLngArray) {
  var marker = L.marker(LatLngArray).addTo(map);
}
