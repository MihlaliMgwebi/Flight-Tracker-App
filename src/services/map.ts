//OBSERVER / EMITTER

import { allFlightsStream$, selectedFlightStream$ } from "../main";
import { IFlight } from "../models/flight";
import { Utils } from "../utils";

allFlightsStream$.pipe(
).subscribe((allFlights) => {
    const allFlightSummaryAndDetailsContainer: HTMLDivElement | HTMLElement | null = document.getElementById('app-main__flights');
    if (allFlightSummaryAndDetailsContainer && allFlightSummaryAndDetailsContainer instanceof HTMLDivElement) {
        if (allFlights)
            return allFlights.flights?.map((flight) => {
                allFlightSummaryAndDetailsContainer.appendChild(
                    createOneFlightSummaryAndDetailsContainer(flight)
                )
            })
    }
    return null;
})


function createOneFlightSummaryAndDetailsContainer(flight: IFlight): HTMLDivElement {
    const flightSummaryAndDetailsContainer = document.createElement("div");
    flightSummaryAndDetailsContainer.className = "app-main__flight";
    flightSummaryAndDetailsContainer.appendChild(createFlightSummaryCollapsibleButton(flight));
    if (flight)
        flightSummaryAndDetailsContainer.appendChild(createFlightDetailsCard(flight));
    return flightSummaryAndDetailsContainer
}

function createFlightSummaryCollapsibleButton(flight: IFlight): HTMLButtonElement {
    const flightSummaryCollapsibleButton = document.createElement("button");
    const flightSummaryCollapsibleButtonId = `flight__summary--collapsible-${flight.icao24}`;
    flightSummaryCollapsibleButton.id = flightSummaryCollapsibleButtonId;
    flightSummaryCollapsibleButton.className = `flight__summary--collapsible`;
    flightSummaryCollapsibleButton.innerHTML = `Flight ${flight.callsign} from ${flight.origin_country}`;
    flightSummaryCollapsibleButton.addEventListener("click", (event) => {
        const button: HTMLButtonElement = event.target as HTMLButtonElement;
        button?.classList.toggle("active");
        button.nextElementSibling?.classList.toggle("hide");
        if (flight && flight.icao24 != null)
            selectedFlightStream$.next(flight.icao24)
    });
    return flightSummaryCollapsibleButton;
}

function createFlightDetailsCard(flight: IFlight) {
    const flightDetailsCard = document.createElement("div");
    flightDetailsCard.id = `flight__details-${flight.icao24}`;
    // flightDetailsCard.className = `flight__details hide`;
    Object.entries(Utils.getFlightSVGAndTextandUnits()).forEach((entry) => {
        const [flightDetail, flightDetailSVGAndTextandUnits] = entry;
        const flightDetailsSVG = document.createElement("p");
        flightDetailsSVG.innerHTML = flightDetailSVGAndTextandUnits.svg;
        const flightDetailsTextAndUnits = document.createElement("p");
        flightDetailsTextAndUnits.innerHTML = `${flightDetailSVGAndTextandUnits.text} ${flight[flightDetail]} ${flightDetailSVGAndTextandUnits.units}`; //add data
        const flightDetails = document.createElement("div");
        flightDetails.id = `flight__detail-${flight[flightDetail]}`;
        flightDetails.appendChild(flightDetailsSVG);
        flightDetails.appendChild(flightDetailsTextAndUnits);
        flightDetailsCard.appendChild(flightDetails);
    });
    return flightDetailsCard;
}