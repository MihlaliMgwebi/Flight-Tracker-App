import { catchError, map, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

let allFlightDetails;
const BASE_URL = "https://opensky-network.org/api/states/all?extended=1&time=";
export function getFirst20FlightDetails(timeInMilliseconds) {
  showSpinner();
  const flightDetails$ = fromFetch(`${BASE_URL}${timeInMilliseconds}`).pipe(
    switchMap((response) => {
      if (response.ok) {
        hideSpinner();
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    }),
    catchError((err) => {
      hideSpinner();
      return of({ error: true, message: err.message });
    }),
    map((flights) => {
      allFlightDetails = flights.states.slice(0, 20).map((flight) => {
        return {
          ICAO24: flight[0] ?? "N/A",
          CALLSIGN: flight[1] ?? "N/A",
          ORIGIN_COUNTRY: flight[2] ?? "N/A",
          LONGITUDE: flight[5] ?? null,
          LATITUDE: flight[6] ?? null,
          ON_GROUND: flight[8] ?? "N/A",
          VELOCITY: flight[9] ?? "N/A",
          TRUE_TRACK: flight[10] ?? "N/A",
          VERTICAL_RATE: flight[11] ?? "N/A",
          GEO_ALTITUDE: flight[13] ?? "N/A",
        };
      });
      return allFlightDetails;
    })
  );
  return flightDetails$;
}

export function getFlightDetails(selectedFlightId) {
  return allFlightDetails.filter(
    (selectedFlightDetails) => selectedFlightDetails.ICAO24 === selectedFlightId
  )[0];
}

function showSpinner() {
  document.getElementById("app-main__spinner").classList.add("show-spinner");
}

function hideSpinner() {
  document.getElementById("app-main__spinner").classList.remove("show-spinner");
}
