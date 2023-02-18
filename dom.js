import { getFlightDetails } from "./api";
import * as map from "./map";

export function loadLandingPage() {
  //[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
  const timeControl = document.getElementById("time-input__input");
  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener("input", () => {
    timeControl.dataset.epoch = convert24HrTimeToUnixTimestampInMilliseconds(
      timeControl.value
    );
    loadFlights();
    map.createMap();
  });
}

function convert24HrTimeToUnixTimestampInMilliseconds(timeControlValue) {
  const date = new Date(timeControlValue);
  return Math.floor(date / 1000); //milliseconds
}

function loadFlights() {
  console.log(getFlightDetails());
  for (let flight of getFlightDetails() ?? []) {
    createFlightCard(flight);
    map.addMarkerToMap(flight);
  }
}

function createFlightCard(flightDetails) {
  const cardId = `card-${flightDetails.ID}`;
  const buttonId = `button-${flightDetails.ID}`;
  const cardFlightDetailsId = `card__details-${flightDetails.ID}`;

  const cardFlightDetails = document.createElement("div");
  cardFlightDetails.id = cardFlightDetailsId;
  cardFlightDetails.className = "flight__details";
  cardFlightDetails.style.display = "none";
  cardFlightDetails.innerHTML = `<p>Flight Deets Laties</p>`;

  const button = document.createElement("button");
  button.id = buttonId;
  button.setAttribute("class", "flight__summary");
  button.setAttribute("data-callsign", flightDetails.CALLSIGN);
  button.setAttribute("data-origin-country", flightDetails.ORIGIN_COUNTRY);
  button.setAttribute("data-longitude", flightDetails.LONGITUDE);
  button.setAttribute("data-latitude", flightDetails.LATITUDE);
  button.setAttribute("data-is-on-ground", flightDetails.IS_ON_GROUND);
  button.setAttribute(
    "data-true-track-compass",
    flightDetails.TRUE_TRACK_COMPASS
  );
  button.setAttribute("data-aircraft-category", flightDetails.CATEGORY);
  button.textContent = `Flight ${flightDetails.CALLSIGN} from ${flightDetails.ORIGIN_COUNTRY}`;

  const card = document.createElement("div");
  card.setAttribute("class", "flight");
  card.setAttribute("id", cardId);

  document.getElementById("flights").appendChild(card);
  card.appendChild(button);
  card.appendChild(cardFlightDetails);

  button.addEventListener("click", (event) => {
    map.moveMapToLatLng([flightDetails.LONGITUDE, flightDetails.LATITUDE]);
    toggleFlightDetailsVisibility(event.target.id);
  });
}

function toggleFlightDetailsVisibility(buttonId) {
  const id = buttonId.split("-").pop();
  const cardFlightDetailsId = `card__details-${id}`;
  const cardFlightContainerId = `card-${id}`;

  const cardFlightDetails = document.getElementById(cardFlightDetailsId);
  const cardFlightContainer = document.getElementById(cardFlightContainerId);

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
