export function getMap(LatLngArray = [-26.107567, 28.056702], zoomLevel = 13) {
  var map = L.map("map-container").setView(LatLngArray, zoomLevel);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}
