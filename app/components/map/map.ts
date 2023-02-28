import L from "leaflet";
import { Subject } from "rxjs";
import { IFlights } from "../../../src/models/flight";
import { arrivalIcon, departureIcon } from "./icons";

export const createAndDisplayMap$ = new Subject<IFlights>();
createAndDisplayMap$.subscribe((allFlights: IFlights) => {
    const mapContainer = document.getElementById("app-main__map");
    if (!mapContainer) return

    const map = L.map(mapContainer).setView([51.505, -0.09], 2);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
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
})
