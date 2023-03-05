import { selectedFlightStream$ } from "../main";
import { IFlight } from "../models/flight";
import { getFlightSVGAndTextandUnits } from "../models/flightCardDetail";

// STEP 1:  Set Up DOM (helper function)
export function defaultDateTimeInputMinDateToTomorrow(): void {
    //[Tomorrow time](https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/)
    const tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
    const day = tomorrow.getDate().toString().padStart(2, "0");
    const hours = "00";
    const minutes = "00";
    const tomorrowDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    const dateTimePicker: HTMLInputElement | HTMLElement | null = document.getElementById('time-input__input-value');
    if (dateTimePicker && dateTimePicker instanceof HTMLInputElement)
        dateTimePicker?.setAttribute("min", tomorrowDate);
}

// STEP 4.1: Call function to render both button and card
export function createOneFlightSummaryAndDetailsContainer(flight: IFlight): HTMLDivElement {
    const flightSummaryAndDetailsContainer = document.createElement("div");
    flightSummaryAndDetailsContainer.className = "app-main__flight";
    flightSummaryAndDetailsContainer.appendChild(createFlightSummaryCollapsibleButton(flight));
    if (flight)
        flightSummaryAndDetailsContainer.appendChild(createFlightDetailsCard(flight));
    return flightSummaryAndDetailsContainer
}

// STEP 4.2: Render Button
function createFlightSummaryCollapsibleButton(flight: IFlight): HTMLButtonElement {
    //style the container that contains the list of buttons
    const flightSummaryCollapsibleButtonContainer = document.getElementById("app-main")
    flightSummaryCollapsibleButtonContainer?.classList.add("shadow-whitesmoke")

    //render button
    const flightSummaryCollapsibleButton = document.createElement("button");
    const flightSummaryCollapsibleButtonId = `flight__summary--collapsible-${flight.icao24}`;
    flightSummaryCollapsibleButton.id = flightSummaryCollapsibleButtonId;
    flightSummaryCollapsibleButton.classList.add("flight__summary--collapsible", "bg-custom", "grey", "w-full", "border-none", "p-4", "border", "border-custom-darkGrey", "border-b-1")
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


// STEP 4.3: Render card
function createFlightDetailsCard(flight: IFlight) {
    const flightDetailsCard = document.createElement("div");
    flightDetailsCard.id = `flight__details-${flight.icao24}`;
    flightDetailsCard.className = "flex gap-4"
    Object.entries(getFlightSVGAndTextandUnits()).forEach((entry) => {
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

export function showSpinner() {
    document.getElementById("app-main__spinner")?.classList.remove("hidden");
}

export function hideSpinner() {
    document.getElementById("app-main__spinner")?.classList.add("hidden");
}