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
  // const timeControl = document.querySelector("#time-input__input");
  // const milliseconds = timeControl.dataset.epoch;
  // axios({
  //     method: RequestMethods.GET,
  //     url: `${BASE_URL}${milliseconds}`
  //   })
  //     .then((responseJSON) => getFlightsOfOriginCountry(responseJSON.data.states, "South Africa")) //console.log(responseJSON.data.states))
  //     .catch((error) => console.error(error))
  //     .finally(() => console.log('hideSpinner'));//hideSpinner()

  return fetch("./data.json")
    .then(console.log("showSpinner"))
    .then((response) => response.json())
    .then((data) => data.states.slice(0, 20))
    .then(console.log("hideSpinner")) //finally
    .catch((error) => console.error(error));
}

// export function getAircraftCategory(categoryNumeric) {
//   return categoryNumeric === undefined
//     ? AircraftCategory[0]
//     : AircraftCategory[categoryNumeric];
// }

export function getListOf20OriginCountries(data, origin) {
  const originCountries = Object.values(data).map((val) => {
    return val[2];
  });
  const distinctCountries = [...new Set(originCountries)]; //Set removes duplicates and spread operator converts set to array
  const nonEmptyDistinctCountries = distinctCountries.filter(
    (element) => element !== ""
  );
  const sortedFirst20NonEmptyDistinctCountries = nonEmptyDistinctCountries
    .slice(0, 20)
    .sort();
  return sortedFirst20NonEmptyDistinctCountries;
}

// export function getFlightsOfTimeAndOriginCountry(time, country){

// }

// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }
