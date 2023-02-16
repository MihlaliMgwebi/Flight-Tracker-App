// [API Calls](https://openskynetwork.github.io/opensky-api/rest.html#all-state-vectors)
// [Example](https://opensky-network.org/api/states/all?time=1677164400)

// information about the current location and movement of aircraft
// enum Aircraft {
//     Id = "3c6444", //0
//     Callsign = "DLH9LF  ", //1
//     OriginCountry = "Germany",//2
//     Longitude = 6.1546,//5
//     Latitude = 50.1964,//6
//     IsOnGround = false,//8
//     TrueTrackCompass = 98.26,//10
//     Category = 1,//17
// }

const RequestMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const BASE_URL = "https://opensky-network.org/api/states/all?extend=1&time=";

// getAllFlightDetailsByTimeInSeconds(
//   RequestMethods.GET,
//   `${BASE_URL}${seconds}`
// );
export function getAllFlightDetailsByTimeInSeconds(method, url) {
  // axios({
  //     method: method,
  //     url: url
  //   })
  //     .then((responseJSON) => getFlightsOfOriginCountry(responseJSON.data.states, "South Africa")) //console.log(responseJSON.data.states))
  //     .catch((error) => console.error(error))
  //     .finally(() => console.log('hideSpinner'));//hideSpinner()

  fetch("./data.json")
    .then(console.log("showSpinner"))
    .then((response) => response.json())
    .then(
      (data) =>
        console.log(getListOf20OriginCountries(data.states, "South Africa")) //console.log(json));
    )
    .then(console.log("hideSpinner")); //finally
}

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
