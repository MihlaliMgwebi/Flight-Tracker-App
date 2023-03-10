import { selectedFlightStream$ } from "../main";
import { IFlight } from "../models/flight";
import { getFlightSVGAndTextandUnits } from "../models/flightCardDetail";

// STEP 1:  Set Up DOM (helper function)
export function defaultDateTimeInputMinDateToTomorrow(): void {
    //[Tomorrow time](https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/)
    const tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year: number = tomorrow.getFullYear();
    const month: string = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
    const day: string = tomorrow.getDate().toString().padStart(2, "0");
    const hours: string = "00";
    const minutes: string = "00";
    const tomorrowDate: string = `${year}-${month}-${day}T${hours}:${minutes}`;
    const dateTimePicker: HTMLInputElement | HTMLElement | null = document.getElementById('time-input__input-value');
    if (dateTimePicker && dateTimePicker instanceof HTMLInputElement)
        dateTimePicker?.setAttribute("min", tomorrowDate);
}

// STEP 4.1: Call function to render both button and card
export function createOneFlightSummaryAndDetailsContainer(flight: IFlight): HTMLDivElement {
    // hide text
    const landingPageText: HTMLElement | null = document.getElementById("app-main__text")
    landingPageText?.classList.add("hidden")

    // append flight summary and details to dom
    const flightSummaryAndDetailsContainer: HTMLDivElement = document.createElement("div");
    flightSummaryAndDetailsContainer.className = "app-main__flight md:w-1/2 lg:w-full";
    flightSummaryAndDetailsContainer.appendChild(createFlightSummaryCollapsibleButton(flight));
    if (flight)
        flightSummaryAndDetailsContainer.appendChild(createFlightDetailsCard(flight));
    return flightSummaryAndDetailsContainer
}

// STEP 4.2: Render Button
function createFlightSummaryCollapsibleButton(flight: IFlight): HTMLButtonElement {
    //style the container that contains the list of buttons
    const flightSummaryCollapsibleButtonContainer: HTMLElement | null = document.getElementById("app-main")
    flightSummaryCollapsibleButtonContainer?.classList.add("shadow-whitesmoke")

    //render button
    const flightSummaryCollapsibleButton: HTMLButtonElement = document.createElement("button");
    flightSummaryCollapsibleButton.setAttribute("aria-expanded", "false");
    const flightSummaryCollapsibleButtonId: string = `flight__summary--collapsible-${flight.icao24}`;
    flightSummaryCollapsibleButton.id = flightSummaryCollapsibleButtonId;
    flightSummaryCollapsibleButton.classList.add("flight__summary--collapsible", "bg-custom-grey", "w-full", "border-none", "p-4", "border", "border-custom-darkGrey", "border-b-1", "hover:bg-custom-active")
    flightSummaryCollapsibleButton.innerHTML = `Flight ${flight.callsign} from ${flight.origin_country}`;
    flightSummaryCollapsibleButton.addEventListener("click", (event) => {
        flightSummaryCollapsibleButton.setAttribute("aria-expanded", "true");
        const activeButton: HTMLButtonElement = event.target as HTMLButtonElement;
        const allButtons: HTMLCollectionOf<Element> = document.getElementsByClassName("flight__summary--collapsible")
        activeButton?.classList.add("bg-custom-active");
        activeButton.nextElementSibling?.classList.toggle("hidden")
        // hide card details of inactive buttons
        Array.from(allButtons).forEach((inactiveButton) => {
            if (inactiveButton !== activeButton) {
                (inactiveButton as HTMLButtonElement).nextElementSibling?.classList.add("hidden");
                inactiveButton.setAttribute("aria-expanded", "false");
            }
        });

        if (flight && flight.icao24 != null)
            selectedFlightStream$.next(flight.icao24)
    });
    return flightSummaryCollapsibleButton;
}


// STEP 4.3: Render card
function createFlightDetailsCard(flight: IFlight): HTMLDivElement {
    const flightDetailsCard: HTMLDivElement = document.createElement("div");
    flightDetailsCard.id = `flight__details-${flight.icao24}`;
    flightDetailsCard.classList.add("flex", "flex-col", "items-center", "bg-custom-lightGrey", "p-2", "hidden");
    Object.entries(getFlightSVGAndTextandUnits()).forEach((entry) => {
        const [flightDetail, flightDetailSVGAndTextandUnits] = entry;
        const flightDetailsSVG: HTMLParagraphElement = document.createElement("p");
        flightDetailsSVG.classList.add("p-2")
        flightDetailsSVG.innerHTML = flightDetailSVGAndTextandUnits.svg;
        const flightDetailsTextAndUnits: HTMLParagraphElement = document.createElement("p");
        flightDetailsTextAndUnits.innerHTML = `${flightDetailSVGAndTextandUnits.text} ${flight[flightDetail]} ${flightDetailSVGAndTextandUnits.units}`; //add data
        const flightDetails: HTMLDivElement = document.createElement("div");
        flightDetails.classList.add("flex", "gap-4")
        flightDetails.id = `flight__detail-${flight[flightDetail]}`;
        flightDetails.appendChild(flightDetailsSVG);
        flightDetails.appendChild(flightDetailsTextAndUnits);
        flightDetailsCard.appendChild(flightDetails);
    });
    return flightDetailsCard;
}

export function showSpinner(): void {
    const spinner: HTMLElement | null = document.getElementById("app-main__spinner")
    spinner?.classList.remove("hidden");
    spinner?.classList.add("flex", "justify-center", "items-center");
}

export function hideSpinner(): void {
    const spinner: HTMLElement | null = document.getElementById("app-main__spinner")
    spinner?.classList.add("hidden");
    spinner?.classList.remove("flex", "justify-center", "items-center");
}

export function showLeafletMap(): void {
    const leafletMapContainer: HTMLElement | null = document.getElementById('app-main__map')
    leafletMapContainer?.classList.remove('invisible')
}