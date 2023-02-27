import L from "leaflet";

export function appendMapToParent(parentElement: HTMLDivElement): void {
    parentElement.appendChild(createMapContainer());
}

function createMapContainer(): HTMLDivElement {
    const mapContainer: HTMLDivElement = document.createElement("div");
    mapContainer.id = "app-main__map";
    mapContainer.classList.add("app-main__map");
    // mapContainer.classList.add("app-main__map", "hide");

    const map = L.map(mapContainer).setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // L.marker([51.5, -0.09]).addTo(map)
    //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //     .openPopup();

    return mapContainer;
}

