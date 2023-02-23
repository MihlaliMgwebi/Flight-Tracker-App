import { loadFlights, setMinTimeInput } from "./dom.js";
setMinTimeInput();
loadFlights();

// import { getFirst20FlightDetails } from "./api.js";

// // import { getFirst20FlightDetailsByTimeInMilliseconds } from "./api.js";
// // // console.log(getFirst20FlightDetailsByTimeInMilliseconds());

// getFirst20FlightDetails(1677149220).subscribe(
//   (flightDetails) => {
//     console.log(flightDetails);
//   },
//   (err) => {
//     console.error(err);
//   }
// );
// // console.log(getFirst20FlightDetails(1677149220));
