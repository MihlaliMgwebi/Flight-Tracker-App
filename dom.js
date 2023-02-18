// DOM Manipulation
import { getFlightDetails, getSVGs } from "./mock";

export function loadFlights() {
  //[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
  const timeControl = document.getElementById("time-input__input");
  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener("input", () => {
    toggleFlightsVisibility();
    //TODO: Move to API, null coalescing

    loadFlightDetails(getFlightDetails());
  });
}

function toggleFlightsVisibility() {
  const toggleClass = "app-main__flights";
  const menu = document.getElementById(toggleClass);
  menu.classList.remove(`${toggleClass}--hidden`);
}

function loadFlightDetails(flight) {
  const flightSummaryCollapsibleButtonId = `flight__summary--collapsible-${flight.ICAO24}`;
  const flightDetailsCardId = `flight__details-${flight.ICAO24}`;

  const flightSummaryCollapsibleButton = document.createElement("button");
  flightSummaryCollapsibleButton.id = flightSummaryCollapsibleButtonId;
  flightSummaryCollapsibleButton.className = `flight__summary--collapsible`;
  flightSummaryCollapsibleButton.innerHTML = `Flight ${flight.CALLSIGN} from orgin country ${flight.ORIGIN_COUNTRY}`;

  const flightDetailsCard = document.createElement("div");
  flightDetailsCard.id = flightDetailsCardId;
  flightDetailsCard.className = `flight__details`;

  const flightSummaryAndDetailsContainer =
    document.getElementById("app-main__flights");
  flightSummaryAndDetailsContainer.appendChild(flightSummaryCollapsibleButton);
  flightSummaryAndDetailsContainer.appendChild(flightDetailsCard);

  createFlightDetailContainer(flight.ICAO24);
}

function createFlightDetailContainer(flightIcao24) {
  const flightDetailsContainer = document.createElement("div");
  flightDetailsContainer.id = `flight__details-${flightIcao24}`;

  Object.entries(getSVGs()).forEach((entry) => {
    const [flightDetail, svg] = entry;
    console.log(svg, flightDetail);

    const flightDetailsSVG = document.createElement("div");
    flightDetailsSVG.innerHTML = svg;
    flightDetailsContainer.appendChild(flightDetailsSVG);
  });
  // container
  // svg in container
  // p in container

  // const flightDetailsCardPropertySVG = svg;
  // const flightDetailsCardPropertyText = document.createElement("p");
  // flightDetailsCardPropertyText.innerHTML = propertyValue;

  const flightDetailsCard = document.getElementById(
    `flight__details-${flightIcao24}`
  );
  flightDetailsCard.appendChild(flightDetailsContainer);
}

// TIME_POSITION: null,
// LAST_CONTACT: null,
// LONGITUDE: null,
// BARO_ALTITUDE: null,
// ON_GROUND: null,
// VELOCITY: null,
// TRUE_TRACK: null,
// VERTICAL_RATE: null,
// SENSORS: null,
// GEO_ALTITUDE: null,
// SQUAWK: null,
// SPI: null,
// POSITION_SOURCE: null,
// CATEGORY: null,
