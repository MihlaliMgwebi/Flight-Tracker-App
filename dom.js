import * as api from "./api";

//[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
export function setUnixTimestampInMilliseconds() {
  const timeControl = document.getElementById("time-input__input");
  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener("input", () => {
    timeControl.dataset.epoch = convert24HrTimeToUnixTimestampInMilliseconds(
      timeControl.value
    );
    loadFlights();
  });
}

function convert24HrTimeToUnixTimestampInMilliseconds(timeControlValue) {
  console.log(timeControlValue);
  const date = new Date(timeControlValue);
  const seconds = Math.floor(date / 1000);
  return seconds;
}

function loadFlights() {
  api.getFirst20FlightDetailsByTimeInSeconds().then((flights) => {
    flights.forEach((flight) => {
      const FlightDetails = {
        ID: flight[0],
        CALLSIGN: "POST",
        ORIGIN_COUNTRY: "PUT",
        LONGITUDE: "DELETE",
        LATITUDE: "GET",
        IS_ON_GROUND: "POST",
        TRUE_TRACK_COMPASS: "PUT",
        CATEGORY: "DELETE",
      };
      createFlightCard(FlightDetails);
    });
  });
}

function createFlightCard(FlightDetails) {
  const card = document.createElement("div");
  card.classList.add("flight");
  card.id = FlightDetails.ID;
  card.setAttribute("data-callsign", FlightDetails.CALLSIGN);
  card.setAttribute("data-origin-country", FlightDetails.ORIGIN_COUNTRY);
  card.setAttribute("data-longitude", FlightDetails.LONGITUDE);
  card.setAttribute("data-is-on-ground", FlightDetails.LATITUDE);
  card.setAttribute("data-callsign", FlightDetails.IS_ON_GROUND);
  card.setAttribute(
    "data-true-track-compass",
    FlightDetails.TRUE_TRACK_COMPASS
  );
  card.setAttribute("aircraft-category", FlightDetails.CATEGORY);

  card.innerHTML = `
  <div class="flight-property flight__origin-country">
    <p>Origin Country:<p>
    </div>
  <div class="flight-property flight__callsign"> 
    <p>Call Sign:<p>
    </div>
  </div>
  <div class="flight-property flight__is-on-ground">
    <p>Is On Ground:<p>
    </div></div>
  <div class="flight-property flight__aircraft-category">
    <p>Aircraft Category:<p>
    </div>
  </div>
  `;
  document.getElementById("flights").appendChild(card);
  // console.log(FlightDetails.ID);
}
// Click the time
// Call API and load results

//     Id = "3c6444", //0
//     Callsign = "DLH9LF  ", //1
//     OriginCountry = "Germany",//2
//     Longitude = 6.1546,//5
//     Latitude = 50.1964,//6
//     IsOnGround = false,//8
//     TrueTrackCompass = 98.26,//10
//     Category = 1,//17
