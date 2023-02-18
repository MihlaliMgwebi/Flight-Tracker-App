// [API Calls](https://openskynetwork.github.io/opensky-api/rest.html#all-state-vectors)
// [Example](https://opensky-network.org/api/states/all?time=1677164400)

const RequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
// const AircraftCategory = {
//   0: "No information at all",

//   1: "No ADS-B Emitter Category Information",

//   2: "Light (< 15500 lbs)",

//   3: "Small (15500 to 75000 lbs)",

//   4: "Large (75000 to 300000 lbs)",

//   5: "High Vortex Large (aircraft such as B-757)",

//   6: "Heavy (> 300000 lbs)",

//   7: " High Performance (> 5g acceleration and 400 kts)",

//   8: "Rotorcraft",

//   9: "Glider / sailplane",

//   10: "Lighter-than-air",

//   11: "Parachutist / Skydiver",

//   12: "Ultralight / hang-glider / paraglider",

//   13: "Reserved",

//   14: "Unmanned Aerial Vehicle",

//   15: "Space / Trans-atmospheric vehicle",

//   16: "Surface Vehicle – Emergency Vehicle",

//   17: "Surface Vehicle – Service Vehicle",

//   18: "Point Obstacle (includes tethered balloons)",

//   19: "Cluster Obstacle",

//   20: "Line Obstacle",
// };

const BASE_URL = "https://opensky-network.org/api/states/all?extended=1&time=";

export function getFirst20FlightDetailsByTimeInSeconds() {
  return fetch("./data.json")
    .then((response) => response.json())
    .then((data) => data.states.slice(0, 9))
    .catch((error) => console.error(error))
    .finally(console.log("hideSpinner"));
}

export async function getFlightDetails() {
  //TODO:mapping function.. working?
  const flightDetails = await getFirst20FlightDetailsByTimeInSeconds();
  const flights = flightDetails.map((flight) => {
    //TODO: nullish coalescing  here
    return {
      ID: flight[0],
      CALLSIGN: flight[1],
      ORIGIN_COUNTRY: flight[2],
      LONGITUDE: flight[5],
      LATITUDE: flight[6],
      IS_ON_GROUND: flight[8],
      TRUE_TRACK_COMPASS: flight[10],
      // CATEGORY: flight[16],
    };
  });
  console.log(flights);
  return flights;
}
