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
  flightSummaryCollapsibleButton.addEventListener("click", (event) => {
    event.target.nextElementSibling.classList.toggle("hide");
    console.log(event.target.nextElementSibling);
  });

  const flightDetailsCard = createFlightDetailsCard(flight.ICAO24);

  const flightSummaryAndDetailsContainer =
    document.getElementById("app-main__flights");
  flightSummaryAndDetailsContainer.appendChild(flightSummaryCollapsibleButton);
  flightSummaryAndDetailsContainer.appendChild(flightDetailsCard);
}

function createFlightDetailsCard(flightIcao24) {
  const flightDetailsCard = document.createElement("div");
  flightDetailsCard.id = `flight__details-${flightIcao24}`;
  flightDetailsCard.classList = `flight__details hide`;

  Object.entries(getSVGs()).forEach((entry) => {
    const [flightDetail, svg] = entry;
    const flightDetailsText = document.createElement("p");
    flightDetailsText.innerHTML = `${flightDetail}: hello`; //add data
    const flightDetailsSVG = document.createElement("p");
    flightDetailsSVG.innerHTML = svg;
    flightDetailsCard.appendChild(flightDetailsSVG);
    flightDetailsCard.appendChild(flightDetailsText);
  });

  return flightDetailsCard;
}
