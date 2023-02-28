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



// export function createAndDisplayLeafletMap(mapElement: HTMLElement) {
//     const map = L.map(mapElement).setView([51.505, -0.09], 13);



//     L.marker([51.5, -0.09]).addTo(map)
//         .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//         .openPopup();
// }


// const mapContainer = document.getElementById('app-main__map');
// mapContainer?.classList.add('hide')
// const map = L.map('app-main__map').setView([51.505, -0.09], 2);

// export function createMap() {
//     mapContainer?.classList.remove('hide')
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     map.invalidateSize();

//     return map;
// }

// export const flightDetailsSubscription$ = new Subject<IFlights>();
// flightDetailsSubscription$.subscribe((allFlights) => {
//     console.log(map);
//     if (allFlights)
//         allFlights.flights?.map((flight) => {
//             if (flight.latitude && flight.longitude)
//                 L.marker([flight.latitude, flight.longitude], {
//                     icon: flight.on_ground ? arrivalIcon : departureIcon,
//                 })
//                     .addTo(map)
//                     .bindPopup(
//                         `Flight ${flight.callsign} from ${flight.origin_country}`
//                     ).on('click', () => {
//                         if (flight.latitude && flight.longitude)
//                             map.flyTo([flight.latitude, flight.longitude], 4, {
//                                 animate: true,
//                                 duration: 2
//                             });
//                     })
//         })
// });
