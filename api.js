import { Observable, map } from "rxjs";
// [API Calls](https://openskynetwork.github.io/opensky-api/rest.html#all-state-vectors)
// [Example](https://opensky-network.org/api/states/all?time=1677164400)
const RequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const BASE_URL = "https://opensky-network.org/api/states/all?extended=1&time=";

function getFirst20FlightDetailsByTimeInMilliseconds(method, url) {
  showSpinner();
  return new Observable((observer) => {
    axios({
      method: method,
      url: url,
    })
      .then((responseJSON) =>
        observer.next(responseJSON.data.states.slice(0, 20))
      )
      .catch((error) => observer.error(error))
      .finally(() => {
        hideSpinner();
        observer.complete();
      });
  });
}

export function getFlightDetails(time) {
  let flightDetails$ = getFirst20FlightDetailsByTimeInMilliseconds(
    RequestMethods.GET,
    `${BASE_URL}${time}`
  ).pipe(
    map((flights) =>
      flights.map((flight) => ({
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
      }))
    )
  );

  return flightDetails$;
}

function showSpinner() {
  document.getElementById("app-main__spinner").classList.add("show-spinner");
}

function hideSpinner() {
  document.getElementById("app-main__spinner").classList.remove("show-spinner");
}
