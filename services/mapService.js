import { filter, fromEvent } from "rxjs";
const flightSummaryCollapsibleButtonClass = "flight__summary--collapsible";
// [Filter based on property] https://www.learnrxjs.io/learn-rxjs/operators/filtering/filter
export const moveMapToLatLng$ = fromEvent(document, "click").pipe(
  filter((event) =>
    event.target.classList.contains(flightSummaryCollapsibleButtonClass)
  )
);

// moveMapToLatLng$.subscribe({
//   next: (event) => {
//     const selectedFlightId = event.target.id.split("-")[3];
//     const selectedFlightDetails = getFlightDetails(selectedFlightId);

//     console.log([
//       selectedFlightDetails.LATITUDE,
//       selectedFlightDetails.LONGITUDE,
//     ]);
//     return [selectedFlightDetails.LATITUDE, selectedFlightDetails.LONGITUDE];
//   },
// });
