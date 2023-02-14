// [API Calls](https://openskynetwork.github.io/opensky-api/rest.html#all-state-vectors)
// [Example](https://opensky-network.org/api/states/all?time=1677164400)
import axios from "axios";



export function getAllStateVectors(method, url){
    // axios({
    //     method: method,
    //     url: url
    //   })
    //     .then((responseJSON) => getFlightsOfOriginCountry(responseJSON.data.states, "South Africa")) //console.log(responseJSON.data.states))
    //     .catch((error) => console.error(error))
    //     .finally(() => console.log('hideSpinner'));//hideSpinner()

    fetch('./data.json')
    .then((response) => response.json())
    .then((data) => console.log(getFlightsOfOriginCountry(data.states, "South Africa")))//console.log(json));
}

export function getListOf20OriginCountries(data, origin) {
    const originCountries = Object.values(data).map(val => {
        return val[2]
    });
    const distinctCountries = [...new Set(originCountries)]; //Set removes duplicates and spread operator converts set to array
    const nonEmptyDistinctCountries = distinctCountries.filter((element) => element !== '')
    const sortedFirst20NonEmptyDistinctCountries = nonEmptyDistinctCountries.slice(0, 20).sort()
    return sortedFirst20NonEmptyDistinctCountries;
}

export function getFlightDetailsByTime(time){
    
}
export function getFlightsOfTimeAndOriginCountry(time, country){
    
}

// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }
