// DOM Manipulation
import { getFirst20FlightDetails } from "./api";
import { addMarkerToMap, createMap, moveMapToLatLng } from "./map.js";

export function setMinTimeInput() {
  //[Tomorrow time](https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
  const day = tomorrow.getDate().toString().padStart(2, "0");
  const hours = "00";
  const minutes = "00";
  const tomorrowDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  document
    .getElementById("time-input__input-value")
    .setAttribute("min", tomorrowDate);
}

export function loadFlights() {
  createMap();
  document.getElementById("app-main__map").classList.add("hide");
  //[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
  const timeControl = document.getElementById("time-input__input-value");

  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener("input", () => {
    toggleVisibility("app-main__flights");
    document.getElementById("app-main__text").style.display = "none";
    document.getElementById("app-main__flights").innerHTML = ""; //remove old flights
    getFirst20FlightDetails(
      convert24HrTimeToUnixTimestampInMilliseconds(timeControl.value)
    ).subscribe((flights) => {
      flights.forEach((flight) => loadFlightDetails(flight));
    });
    document.getElementById("app-main__map").classList.remove("hide");
  });
}

function convert24HrTimeToUnixTimestampInMilliseconds(timeControlValue) {
  const date = new Date(timeControlValue);
  return Math.floor(date / 1000);
}

function toggleVisibility(toggleClass) {
  const menu = document.getElementById(toggleClass);
  menu.classList.remove(`${toggleClass}--hidden`);
}

function loadFlightDetails(flight) {
  if (flight.LATITUDE !== null && flight.LONGITUDE !== null)
    addMarkerToMap(flight);

  const flightSummaryCollapsibleButtonId = `flight__summary--collapsible-${flight.ICAO24}`;

  const flightSummaryCollapsibleButton = document.createElement("button");
  flightSummaryCollapsibleButton.id = flightSummaryCollapsibleButtonId;
  flightSummaryCollapsibleButton.className = `flight__summary--collapsible`;
  flightSummaryCollapsibleButton.innerHTML = `Flight ${flight.CALLSIGN} from ${flight.ORIGIN_COUNTRY}`;

  const flightSummaryCollapsibleButton$ = fromEvent(
    flightSummaryCollapsibleButton,
    "click"
  );

  flightSummaryCollapsibleButton$.subscribe(() => {
    flightSummaryCollapsibleButton.classList.toggle("active");
    flightSummaryCollapsibleButton.nextElementSibling.classList.toggle("hide");
    if (flight.LATITUDE !== null && flight.LONGITUDE !== null)
      moveMapToLatLng([flight.LATITUDE, flight.LONGITUDE]);
  });
  const flightDetailsCard = createFlightDetailsCard(flight);

  const flightSummaryAndDetailsContainer = document.createElement("div");
  flightSummaryAndDetailsContainer.className = "app-main__flight";
  flightSummaryAndDetailsContainer.appendChild(flightSummaryCollapsibleButton);
  flightSummaryAndDetailsContainer.appendChild(flightDetailsCard);

  document
    .getElementById("app-main__flights")
    .appendChild(flightSummaryAndDetailsContainer);
}

function createFlightDetailsCard(flight) {
  const flightDetailsCard = document.createElement("div");
  flightDetailsCard.id = `flight__details-${flight.ICAO24}`;
  flightDetailsCard.classList = `flight__details hide`;

  Object.entries(getFlightSVGAndTextandUnits()).forEach((entry) => {
    const [flightDetail, FlightDetailSVGAndTextandUnits] = entry;
    // console.log(key, value.svg, value.text, value.units);
    const flightDetailsSVG = document.createElement("p");
    flightDetailsSVG.innerHTML = FlightDetailSVGAndTextandUnits.svg;
    const flightDetailsTextAndUnits = document.createElement("p");
    flightDetailsTextAndUnits.innerHTML = `${FlightDetailSVGAndTextandUnits.text} ${flight[flightDetail]} ${FlightDetailSVGAndTextandUnits.units}`; //add data
    const flightDetails = document.createElement("div");
    flightDetails.id = `flight__detail-${flight[flightDetail]}`;
    flightDetails.appendChild(flightDetailsSVG);
    flightDetails.appendChild(flightDetailsTextAndUnits);
    flightDetailsCard.appendChild(flightDetails);
  });

  return flightDetailsCard;
}

function getFlightSVGAndTextandUnits() {
  const flightDetails = {
    CALLSIGN: {
      svg: '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>',
      text: "Call Sign:",
      units: "",
    },
    VELOCITY: {
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20.38 8.57l-1.23 1.85a8 8 0 01-.22 7.58H5.07A8 8 0 0115.58 6.85l1.85-1.23A10 10 0 003.35 19a2 2 0 001.72 1h13.85a2 2 0 001.74-1 10 10 0 00-.27-10.44z"></path><path d="M10.59 15.41a2 2 0 002.83 0l5.66-8.49-8.49 5.66a2 2 0 000 2.83z"></path></svg>',
      text: "Velocity:",
      units: "meters/second",
    },
    TRUE_TRACK: {
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M203.97 23l-18.032 4.844 11.656 43.468c-25.837 8.076-50.32 21.653-71.594 40.75L94.53 80.594l-13.218 13.22 31.376 31.374c-19.467 21.125-33.414 45.53-41.813 71.343l-42.313-11.343-4.843 18.063 42.25 11.313c-6.057 27.3-6.157 55.656-.345 83L23.72 308.78l4.843 18.064 41.812-11.22c6.693 21.225 17.114 41.525 31.25 59.876l-29.97 52.688-16.81 29.593 29.56-16.842 52.657-29.97c18.41 14.216 38.784 24.69 60.094 31.407l-11.22 41.844 18.033 4.81 11.218-41.905c27.345 5.808 55.698 5.686 83-.375l11.312 42.28 18.063-4.81-11.344-42.376c25.812-8.4 50.217-22.315 71.342-41.78l31.375 31.373 13.22-13.218-31.47-31.47c19.09-21.266 32.643-45.738 40.72-71.563l43.53 11.657 4.813-18.063-43.625-11.686c5.68-27.044 5.576-55.06-.344-82.063l43.97-11.78-4.813-18.063L440.908 197c-6.73-20.866-17.08-40.79-31.032-58.844l29.97-52.656 16.842-29.563-29.593 16.844-52.656 29.97c-17.998-13.875-37.874-24.198-58.657-30.906l11.783-44L309.5 23l-11.78 43.97c-27-5.925-55.02-6.05-82.064-.376L203.97 23zm201.56 85L297.25 298.313l-.75.437-40.844-40.875-148.72 148.72-2.186 1.25 109.125-191.75 41.78 41.78L405.532 108zm-149.686 10.594c21.858 0 43.717 5.166 63.594 15.47l-116.625 66.342-2.22 1.28-1.28 2.22-66.25 116.406c-26.942-52.04-18.616-117.603 25.03-161.25 26.99-26.988 62.38-40.468 97.75-40.468zm122.72 74.594c26.994 52.054 18.67 117.672-25.002 161.343-43.66 43.662-109.263 52.005-161.312 25.033l116.438-66.282 2.25-1.25 1.25-2.25 66.375-116.592z"></path></svg>',
      text: "True Track:",
      units: "degrees",
    },
    VERTICAL_RATE: {
      svg: '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1464 6.85355C11.3417 7.04882 11.6583 7.04882 11.8536 6.85355C12.0488 6.65829 12.0488 6.34171 11.8536 6.14645L7.85355 2.14645C7.65829 1.95118 7.34171 1.95118 7.14645 2.14645L3.14645 6.14645C2.95118 6.34171 2.95118 6.65829 3.14645 6.85355C3.34171 7.04882 3.65829 7.04882 3.85355 6.85355L7.5 3.20711L11.1464 6.85355ZM11.1464 12.8536C11.3417 13.0488 11.6583 13.0488 11.8536 12.8536C12.0488 12.6583 12.0488 12.3417 11.8536 12.1464L7.85355 8.14645C7.65829 7.95118 7.34171 7.95118 7.14645 8.14645L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L7.5 9.20711L11.1464 12.8536Z" fill="currentColor"></path></svg>',
      text: "Vertical Rate:",
      units: "meters/min",
    },
    GEO_ALTITUDE: {
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M465.4 409.4l87.1-150.2-32-.3-55.1 95L259.2 0 23 407.4l32 .3L259.2 55.6zm-355.3-44.1h32.1l117.4-202.5L463 511.9l32.5.1-235.8-404.6z"></path></svg>',
      text: "Geographic Altitude:",
      units: "meters",
    },
  };
  return flightDetails;
}
