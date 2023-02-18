// DOM Manipulation

export function loadFlights() {
  //[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
  const timeControl = document.getElementById("time-input__input");
  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener("input", () => {
    toggleFlightsVisibility();
    //TODO: Move to API, null coalescing
    const flight = {
      ID: 1, //null,
      CALLSIGN: 1, //null,
      ORIGIN_COUNTRY: 2, //null,
      LONGITUDE: null,
      LATITUDE: null,
      IS_ON_GROUND: null,
      TRUE_TRACK_COMPASS: null,
    };
    loadFlightDetails(flight);
  });
}

function toggleFlightsVisibility() {
  const toggleClass = "app-main__flights";
  const menu = document.getElementById(toggleClass);
  menu.classList.remove(`${toggleClass}--hidden`);
}

function loadFlightDetails(flight) {
  const flightSummaryCollapsibleButtonId = `flight__summary--collapsible-${flight.ID}`;
  const flightDetailsCardId = `flight__details-${flight.ID}`;

  const flightSummaryCollapsibleButton = document.createElement("button");
  flightSummaryCollapsibleButton.id = flightSummaryCollapsibleButtonId;
  flightSummaryCollapsibleButton.className = `flight__summary--collapsible-${flight.ID}`;
  flightSummaryCollapsibleButton.innerHTML = `Flight ${flight.CALLSIGN} from orgin country ${flight.ORIGIN_COUNTRY}`;

  const flightDetailsCard = document.createElement("div");
  flightDetailsCard.id = flightDetailsCardId;
  flightDetailsCard.className = `flight__details`;
  // console.log(document.getElementById(flightSummaryCollapsibleButtonId));

  const flightSummaryAndDetailsContainer =
    document.getElementById("app-main__flights");
  flightSummaryAndDetailsContainer.appendChild(flightSummaryCollapsibleButton);
  flightSummaryAndDetailsContainer.appendChild(flightDetailsCard);
}
