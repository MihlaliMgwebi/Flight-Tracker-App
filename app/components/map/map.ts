import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Subject } from 'rxjs';
import { IFlights } from '../../../src/models/flight';
import { arrivalIcon, departureIcon } from './icons';

export const createLeafletMapWithMarkers$ = new Subject<IFlights>();
createLeafletMapWithMarkers$.subscribe((allFlights: IFlights) => {
    const map = L.map('app-main__map').setView([51.505, -0.09], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
        // + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        // 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    }).addTo(map);

    map.invalidateSize();

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
