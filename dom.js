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
      createFlightCard(FlightDetails);

      map.addMarkerToMap(FlightDetails);
    });
  });
}

function createFlightCard(FlightDetails) {
  const cardId = `card-${FlightDetails.ID}`;
  const buttonId = `button-${FlightDetails.ID}`;
  const cardFlightDetailsId = `card__details-${FlightDetails.ID}`;

  const cardFlightDetails = document.createElement("div");
  cardFlightDetails.setAttribute("id", cardFlightDetailsId);
  cardFlightDetails.setAttribute("class", "flight__details");
  cardFlightDetails.setAttribute("style", "display:none");
  cardFlightDetails.innerHTML = `<p>Flight Deets Laties</p>`;

  const button = document.createElement("button");
  button.setAttribute("id", buttonId);
  button.setAttribute("class", "flight__summary");
  button.setAttribute("data-callsign", FlightDetails.CALLSIGN);
  button.setAttribute("data-origin-country", FlightDetails.ORIGIN_COUNTRY);
  button.setAttribute("data-longitude", FlightDetails.LONGITUDE);
  button.setAttribute("data-latitude", FlightDetails.LATITUDE);
  button.setAttribute("data-is-on-ground", FlightDetails.IS_ON_GROUND);
  button.setAttribute(
    "data-true-track-compass",
    FlightDetails.TRUE_TRACK_COMPASS
  );
  button.setAttribute("aircraft-category", FlightDetails.CATEGORY);
  button.textContent = `Flight ${FlightDetails.CALLSIGN} from ${FlightDetails.ORIGIN_COUNTRY}`;

  // TODO: if lat and lng not null
  const card = document.createElement("div");
  card.setAttribute("class", "flight");
  card.setAttribute("id", cardId);

  document.getElementById("flights").appendChild(card);
  card.appendChild(button);
  card.appendChild(cardFlightDetails);

  button.addEventListener("click", (event) => {
    map.showMapAtMarker([FlightDetails.LONGITUDE, FlightDetails.LATITUDE]);
    toggleFlightDetailsVisibility(event.target.id);
  });
}

function toggleFlightDetailsVisibility(buttonId) {
  const id = buttonId.split("-").pop();
  const cardFlightDetailsId = `card__details-${id}`;
  const cardFlightContainerId = `card-${id}`;

  // console.log("id", id);
  // console.log("cardFlightDetailsId", cardFlightDetailsId);

  const cardFlightDetails = document.querySelector(`#${cardFlightDetailsId}`);
  const cardFlightContainer = document.querySelector(
    `#${cardFlightContainerId}`
  );
  console.log("cardFlightDetails", cardFlightDetails.style);
  if (cardFlightDetails.style.display === "none") {
    cardFlightDetails.style.display = "block";
    cardFlightContainer.style.height = "8rem";
    cardFlightContainer.style.flexDirection = "column";
  } else {
    cardFlightDetails.style.display = "none";
    cardFlightContainer.style.height = "2rem";
    cardFlightContainer.style.flexDirection = "row";
  }
}

// <div class="flight-property flight__origin-country">
//   <span>Origin Country:</span>
//   <div>${FlightDetails.ORIGIN_COUNTRY}</div>
//   </div>
// <div class="flight-property flight__callsign">
//   <span>Call Sign:</span>
//   <div>${FlightDetails.CALLSIGN}</div>
//   </div>
// </div>
// <div class="flight-property flight__is-on-ground">
//   <div class="isOnGround-icon__${FlightDetails.IS_ON_GROUND}"></div>
//   <span class="isOnGround-icon__${FlightDetails.IS_ON_GROUND}"></span>
//   </div></div>
// </div>
// `;
// <div class="flight-property flight__aircraft-category">
// <p>Aircraft Category:<p>
// <div>${api.getAircraftCategory(FlightDetails.CATEGORY)}</div>
// </div>
