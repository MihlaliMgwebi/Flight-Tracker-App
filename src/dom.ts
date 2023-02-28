// DOM Manipulation
import { createFlightSummaryAndDetailsContainer$ } from '../app/components/flights/flight';
import { createLeafletMapWithMarkers$ } from '../app/components/map/map';
import { IFlights } from "./models/flight";

export function manipulateDOM(flights: IFlights): void {
    const mapElement = document.getElementById('app-main__map')
    if (mapElement)
        createLeafletMapWithMarkers$.next(flights);

    const flightSummaryAndDetailsContainer = document.getElementById('app-main__flights')
    if (flightSummaryAndDetailsContainer instanceof HTMLDivElement)
        createFlightSummaryAndDetailsContainer$.next(flights)
}

// //Chile not sure when to show and hide w/ time Input and button
export function showSpinner() {
    document.getElementById("app-main__spinner")!.classList.add("show-spinner");
}

export function hideSpinner() {
    document.getElementById("app-main__spinner")?.classList.remove("show-spinner");
}

