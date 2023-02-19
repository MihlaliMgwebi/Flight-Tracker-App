// [API Calls](https://openskynetwork.github.io/opensky-api/rest.html#all-state-vectors)
// [Example](https://opensky-network.org/api/states/all?time=1677164400)

const RequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const BASE_URL = "https://opensky-network.org/api/states/all?extended=1&time=";

export function getFirst20FlightDetailsByTimeInSeconds(method, url) {
  //   return axios({
  //     method: method,
  //     url: url,
  //   })
  //     .then((responseJSON) => responseJSON.data.states.slice(0, 20))
  //     .catch((error) => console.error(error))
  //     .finally(() => console.log("hideSpinner"));
  return fetch("./data.json")
    .then((response) => response.json())
    .then((data) => data.states.slice(0, 20))
    .catch((error) => console.error(error))
    .finally(console.log("hideSpinner"));
}

export async function getFlightDetails(time) {
  const flightDetails = await getFirst20FlightDetailsByTimeInSeconds(
    RequestMethods.GET,
    `${BASE_URL}${time}`
  );

  console.log(time);
  const flights = flightDetails.map((flight) => {
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
  return flights;
}
