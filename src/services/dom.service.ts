import { combineLatestWith, filter, map, switchMap, tap } from "rxjs";
import { allFlightsStream$, dateTimeInMillisecondsStream$, dateTimePickerOnInput$, selectedFlightStream$, zoomToPostitionOnMap$ } from "../main";
import { IFlight } from "../models/flight";
import { getFlightSVGAndTextandUnits } from "../models/flightCardDetail";
import { Utils } from "../utils";
import { pollFirst20FlightDetails } from "./api.service";
import { createLeafletMapWithMarkers } from "./map.service";

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

// STEP 2:  Emit date time inputted
dateTimePickerOnInput$.subscribe((event: Event) => {
    console.log(event)
    const dateTimePicker = event.target as HTMLInputElement;
    if (dateTimePicker && dateTimePicker.id === 'time-input__input-value') {
        const dateTime: string = dateTimePicker.value;
        dateTimeInMillisecondsStream$.next(dateTime)
    }
});

// STEP 3:  Convert date time to milliseconds then use to poll flights
dateTimeInMillisecondsStream$.pipe(
    map((dateTime) => {
        return (dateTime === undefined) ? "" : dateTime;
    }),
    filter((dateTime) => dateTime !== ""),
    map((dateTime) => Utils.convertDateTimeToLocalUnixTimestampInSeconds(dateTime)),
    tap(() => showSpinner()),
    switchMap((dateTimeInMilliseconds) => pollFirst20FlightDetails(dateTimeInMilliseconds)),
    tap(() => hideSpinner()),
).subscribe((flightDetails) => allFlightsStream$.next(flightDetails))

// STEP 4: Render DOM
allFlightsStream$.subscribe((allFlights) => {
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

// STEP 4.1: Call function to render both button and card
function createOneFlightSummaryAndDetailsContainer(flight: IFlight): HTMLDivElement {
    const flightSummaryAndDetailsContainer = document.createElement("div");
    flightSummaryAndDetailsContainer.className = "app-main__flight";
    flightSummaryAndDetailsContainer.appendChild(createFlightSummaryCollapsibleButton(flight));
    if (flight)
        flightSummaryAndDetailsContainer.appendChild(createFlightDetailsCard(flight));
    return flightSummaryAndDetailsContainer
}

// STEP 4.2: Render Button
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


// STEP 4.3: Render card
function createFlightDetailsCard(flight: IFlight) {
    const flightDetailsCard = document.createElement("div");
    flightDetailsCard.id = `flight__details-${flight.icao24}`;
    // flightDetailsCard.className = `flight__details hide`;
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

// STEP 5: When click on button, display flight details in card and zoom to location on map
allFlightsStream$.pipe(
    combineLatestWith(selectedFlightStream$),
    map(
        ([allFlights, selectedFlightIcao24]) => {
            if (allFlights && selectedFlightIcao24) {
                const flights: IFlight[] | null = allFlights?.flights;
                if (flights)
                    return flights.find(flight => flight.icao24 === selectedFlightIcao24)
            }
            return undefined
        }
    )
)
    .subscribe((selectedFlight: IFlight | undefined) => {
        if (selectedFlight) {
            zoomToPostitionOnMap$.next({ latitude: selectedFlight?.latitude, longitude: selectedFlight?.longitude })

            const selectedFlightDetailsCard = document.getElementById(`flight__details-${selectedFlight?.icao24}`);
            if (selectedFlightDetailsCard instanceof HTMLDivElement) {
                //hide all cards
                const allFlightsDetailsCards = document.getElementsByClassName(`flight__details`);
                Array.from(allFlightsDetailsCards).forEach(card => {
                    if (!card.classList.contains('hide'))
                        card.classList.add('hide');
                })
                // show selected card
                selectedFlightDetailsCard.classList.remove('hide')
            }
        }
    });

allFlightsStream$.subscribe((allFlights) => {
    if (allFlights?.flights)
        createLeafletMapWithMarkers(allFlights)
})

function showSpinner() {
    document.getElementById("app-main__spinner")?.classList.add("show-spinner");
}

function hideSpinner() {
    document.getElementById("app-main__spinner")?.classList.remove("show-spinner");
}