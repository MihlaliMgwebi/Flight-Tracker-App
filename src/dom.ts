// DOM Manipulation
import { createAndDisplayMap$ } from "../app/components/map/map";

import { IFlights } from "./models/flight";

// import { appendTimeInputToParent } from "../app/components/timeInput/timeInput";
export function manipulateDOM(flights: IFlights): void {
    createAndDisplayMap$.next(flights)
}

// //Chile not sure when to show and hide w/ time Input and button
export function showSpinner() {
    document.getElementById("app-main__spinner")!.classList.add("show-spinner");
}

export function hideSpinner() {
    document.getElementById("app-main__spinner")?.classList.remove("show-spinner");
}

