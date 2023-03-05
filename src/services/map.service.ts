import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { zoomToPostitionOnMap$ } from '../main';
import { IFlights } from '../models/flight';

const arrivalIcon = L.icon({
    iconUrl: "assets/airplane-arrival.svg",
    iconSize: [30, 30],
});
const departureIcon = L.icon({
    iconUrl: "assets/airplane-departure.svg",
    iconSize: [30, 30],
});

export const leafletMap = L.map('app-main__map').setView([51.505, -0.09], 2);
export function createLeafletMapWithMarkers(allFlights: IFlights) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
    }).addTo(leafletMap);
    leafletMap.invalidateSize();

    if (allFlights)
        allFlights.flights?.map((flight) => {
            if (flight.latitude && flight.longitude)
                L.marker([flight.latitude, flight.longitude], {
                    icon: flight.on_ground ? arrivalIcon : departureIcon,
                    alt: `Flight ${flight.callsign} from ${flight.origin_country}`
                })
                    .addTo(leafletMap)
                    .bindPopup(
                        `Flight ${flight.callsign} from ${flight.origin_country}`
                    ).on('click', () => {
                        if (flight.latitude && flight.longitude)
                            zoomToPostitionOnMap$.next({ latitude: flight.latitude, longitude: flight.longitude })
                    })
        })
};

