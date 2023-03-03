import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { allFlightsStream$, zoomToPostitionOnMap$ } from '../main';
import { IFlights } from '../models/flight';

export const arrivalIcon = L.icon({
    iconUrl: "assets/airplane-arrival.svg",
    iconSize: [30, 30],
});

export const departureIcon = L.icon({
    iconUrl: "assets/airplane-departure.svg",
    iconSize: [30, 30],
});

allFlightsStream$.subscribe((allFlights) => {
    if (allFlights?.flights)
        createLeafletMapWithMarkers(allFlights)
})

const leafletMap = L.map('app-main__map').setView([51.505, -0.09], 2);

function createLeafletMapWithMarkers(allFlights: IFlights) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
    }).addTo(leafletMap);
    leafletMap.invalidateSize();

    if (allFlights)
        allFlights.flights?.map((flight) => {
            if (flight.latitude && flight.longitude)
                L.marker([flight.latitude, flight.longitude], {
                    icon: flight.on_ground ? arrivalIcon : departureIcon,
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

zoomToPostitionOnMap$.subscribe((LatLngTuple) => {
    if (LatLngTuple?.latitude && LatLngTuple.longitude) {
        leafletMap.flyTo([LatLngTuple.latitude, LatLngTuple.longitude], 4, {
            animate: true,
            duration: 2
        });
    }
})