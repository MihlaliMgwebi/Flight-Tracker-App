import * as api from "./api";
import * as map from "./map";
export function loadLandingPage() {
  setUnixTimestampInMilliseconds();
}

//[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
function setUnixTimestampInMilliseconds() {
  const timeControl = document.getElementById("time-input__input");
  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener("input", () => {
    timeControl.dataset.epoch = convert24HrTimeToUnixTimestampInMilliseconds(
      timeControl.value
    );
    loadFlights();
    map.showMap();
  });
}

function convert24HrTimeToUnixTimestampInMilliseconds(timeControlValue) {
  // console.log(timeControlValue);
  const date = new Date(timeControlValue);
  const seconds = Math.floor(date / 1000);
  return seconds;
}

function loadFlights() {
  api.getFirst20FlightDetailsByTimeInSeconds().then((flights) => {
    flights.forEach((flight) => {
      // console.log(flight);
      const FlightDetails = {
        ID: flight[0],
        CALLSIGN: flight[1],
        ORIGIN_COUNTRY: flight[2],
        LONGITUDE: flight[5],
        LATITUDE: flight[6],
        IS_ON_GROUND: flight[8],
        TRUE_TRACK_COMPASS: flight[10],
        // CATEGORY: flight[16],
      };
      const card = createFlightCard(FlightDetails);
      document.getElementById("flights").appendChild(card);

      map.addMarkerToMap(FlightDetails);
    });
  });
}

function createFlightCard(FlightDetails) {
  // if lat and lng not null
  const card = document.createElement("div");
  card.classList.add("flight");
  card.id = FlightDetails.ID;
  card.addEventListener("click", () => console.log("flight"));
  card.setAttribute("data-callsign", FlightDetails.CALLSIGN);
  card.setAttribute("data-origin-country", FlightDetails.ORIGIN_COUNTRY);
  card.setAttribute("data-longitude", FlightDetails.LONGITUDE);
  card.setAttribute("data-latitude", FlightDetails.LATITUDE);
  card.setAttribute("data-is-on-ground", FlightDetails.IS_ON_GROUND);
  card.setAttribute(
    "data-true-track-compass",
    FlightDetails.TRUE_TRACK_COMPASS
  );
  card.setAttribute("aircraft-category", FlightDetails.CATEGORY);

  card.innerHTML = `
  <div class="flight-property flight__origin-country">
    <span>Origin Country:</span>
    <div>${FlightDetails.ORIGIN_COUNTRY}</div>
    </div>
  <div class="flight-property flight__callsign"> 
    <span>Call Sign:</span>
    <div>${FlightDetails.CALLSIGN}</div>
    </div>
  </div>
  <div class="flight-property flight__is-on-ground">
    <div class="isOnGround-icon__${FlightDetails.IS_ON_GROUND}"></div>
    <span class="isOnGround-icon__${FlightDetails.IS_ON_GROUND}"></span>
    </div></div>
  </div>
  `;
  // <div class="flight-property flight__aircraft-category">
  // <p>Aircraft Category:<p>
  // <div>${api.getAircraftCategory(FlightDetails.CATEGORY)}</div>
  // </div>
  return card;
  // console.log(FlightDetails.ID);
}
