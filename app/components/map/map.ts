import L from "leaflet";
import { getFirst20FlightDetails } from "../../../src/api";
import { arrivalIcon, departureIcon } from './icons';

const map = L.map('app-main__map').setView([51.505, -0.09], 2);

export function createMap() {
    const mapContainer = document.getElementById('app-main__map');
    if (!mapContainer) return

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.invalidateSize();

    addMarkersToMap();
}

function addMarkersToMap() {
    getFirst20FlightDetails().subscribe((allFlights) => {
        if (allFlights)
            allFlights.flights?.map((flight) => {
                if (flight.latitude && flight.longitude)
                    L.marker([flight.latitude, flight.longitude], {
                        icon: flight.on_ground ? arrivalIcon : departureIcon,
                    })
                        .addTo(map)
                        .bindPopup(
                            `Flight ${flight.callsign} from ${flight.origin_country}`
                        ).on('click', () => {
                            if (flight.latitude && flight.longitude)
                                map.flyTo([flight.latitude, flight.longitude], 4, {
                                    animate: true,
                                    duration: 2
                                });
                        })
            })
    });
}
