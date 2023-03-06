import { BehaviorSubject, combineLatestWith, filter, fromEvent, map, switchMap, tap } from 'rxjs';
import { IFlight, IFlights } from './models/flight';
import { pollFirst20FlightDetails } from './services/api.service';
import { createOneFlightSummaryAndDetailsContainer, defaultDateTimeInputMinDateToTomorrow, hideSpinner, showLeafletMap, showSpinner } from './services/dom.service';
import { createLeafletMapWithMarkers, leafletMap } from './services/map.service';
import { Utils } from './utils';

export const setUpDomWhenPageLoadedOrReloaded$ = fromEvent(window, 'load');
export const dateTimePickerOnInput$ = fromEvent(document, 'input');
export const dateTimeInMillisecondsStream$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
export const selectedFlightStream$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
export const allFlightsStream$: BehaviorSubject<IFlights | undefined> = new BehaviorSubject<IFlights | undefined>(undefined);
export const zoomToPostitionOnMap$: BehaviorSubject<{ latitude: number | null | undefined, longitude: number | null | undefined } | undefined> = new BehaviorSubject<{ latitude: number | null | undefined, longitude: number | null | undefined } | undefined>(undefined);

// STEP 1:  Set Up DOM
setUpDomWhenPageLoadedOrReloaded$.subscribe(_ => {
  defaultDateTimeInputMinDateToTomorrow();
})

// STEP 2:  Emit date time inputted
dateTimePickerOnInput$.subscribe((event: Event) => {
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
  tap(() => showSpinner()),
  map((dateTime) => Utils.convertDateTimeToLocalUnixTimestampInSeconds(dateTime)),
  switchMap((dateTimeInMilliseconds) => pollFirst20FlightDetails(dateTimeInMilliseconds)),
  tap(() => hideSpinner()),
).subscribe((flightDetails) => allFlightsStream$.next(flightDetails))

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
        Array.from(allFlightsDetailsCards).forEach(eachFlightsDetailsCards => {
          eachFlightsDetailsCards.classList.add('hidden')
        })
        // show selected card
        selectedFlightDetailsCard.classList.remove('hidden')
      }
    }
  });

allFlightsStream$.subscribe((allFlights) => {
  if (allFlights?.flights)
    createLeafletMapWithMarkers(allFlights)
})

// STEP 4: Render DOM
allFlightsStream$.subscribe((allFlights) => {
  const allFlightSummaryAndDetailsContainer = document.getElementById('app-main__flights');
  if (allFlightSummaryAndDetailsContainer instanceof HTMLDivElement) {
    // Remove all existing child nodes
    while (allFlightSummaryAndDetailsContainer.firstChild) {
      allFlightSummaryAndDetailsContainer.removeChild(allFlightSummaryAndDetailsContainer.firstChild);
    }

    // Show map and Add new flight summary and details containers
    if (allFlights && allFlights.flights) {
      showLeafletMap()
      allFlights.flights.forEach((flight) => {
        const newFlightSummaryAndDetailsContainer = createOneFlightSummaryAndDetailsContainer(flight);
        allFlightSummaryAndDetailsContainer.appendChild(newFlightSummaryAndDetailsContainer);
      });
    }
    else {
      const errorHandlingMessage = document.createElement("p")
      errorHandlingMessage?.classList.add("text-3xl", "block", "my-4", "font-bold", "underline")
      errorHandlingMessage.innerHTML = "No Flights Available"

      const landingPageText = document.getElementById("app-main__text")
      landingPageText?.appendChild(errorHandlingMessage)
    }
  }
});
// STEP 6.3: Zoom to flight location on map
zoomToPostitionOnMap$.subscribe((LatLngTuple) => {
  if (LatLngTuple?.latitude && LatLngTuple.longitude) {
    leafletMap.flyTo([LatLngTuple.latitude, LatLngTuple.longitude], 4, {
      animate: true,
      duration: 2
    });
  }
})