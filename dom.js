// DOM Manipulation
import { getFlightDetails } from "./api";
import { addMarkerToMap, createMap, moveMapToLatLng } from "./map.js";
export function loadFlights() {
  //[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
  const timeControl = document.getElementById("time-input__input-value");
  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener("input", () => {
    toggleVisibility("app-main__flights");
    getFlightDetails(
      convert24HrTimeToUnixTimestampInMilliseconds(timeControl.value)
    ).then((flights) => {
      flights.forEach((flight) => loadFlightDetails(flight));
    });
    createMap();
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
  flightSummaryCollapsibleButton.addEventListener("click", (event) => {
    event.target.classList.toggle("active");
    event.target.nextElementSibling.classList.toggle("hide");
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

  Object.entries(getSVGs()).forEach((entry) => {
    const [flightDetail, svg] = entry;
    const flightDetailsText = document.createElement("p");
    flightDetailsText.innerHTML = `${flightDetail}: ${flight[flightDetail]}`; //add data
    const flightDetailsSVG = document.createElement("p");
    flightDetailsSVG.innerHTML = svg;
    const flightDetails = document.createElement("div");
    flightDetails.id = `flight__detail-${flight[flightDetail]}`;
    flightDetails.appendChild(flightDetailsSVG);
    flightDetails.appendChild(flightDetailsText);
    flightDetailsCard.appendChild(flightDetails);
  });

  return flightDetailsCard;
}

function getSVGs() {
  const svg = {
    CALLSIGN:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>',
    ON_GROUND:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>',
    VELOCITY:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>',
    TRUE_TRACK:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M203.97 23l-18.032 4.844 11.656 43.468c-25.837 8.076-50.32 21.653-71.594 40.75L94.53 80.594l-13.218 13.22 31.376 31.374c-19.467 21.125-33.414 45.53-41.813 71.343l-42.313-11.343-4.843 18.063 42.25 11.313c-6.057 27.3-6.157 55.656-.345 83L23.72 308.78l4.843 18.064 41.812-11.22c6.693 21.225 17.114 41.525 31.25 59.876l-29.97 52.688-16.81 29.593 29.56-16.842 52.657-29.97c18.41 14.216 38.784 24.69 60.094 31.407l-11.22 41.844 18.033 4.81 11.218-41.905c27.345 5.808 55.698 5.686 83-.375l11.312 42.28 18.063-4.81-11.344-42.376c25.812-8.4 50.217-22.315 71.342-41.78l31.375 31.373 13.22-13.218-31.47-31.47c19.09-21.266 32.643-45.738 40.72-71.563l43.53 11.657 4.813-18.063-43.625-11.686c5.68-27.044 5.576-55.06-.344-82.063l43.97-11.78-4.813-18.063L440.908 197c-6.73-20.866-17.08-40.79-31.032-58.844l29.97-52.656 16.842-29.563-29.593 16.844-52.656 29.97c-17.998-13.875-37.874-24.198-58.657-30.906l11.783-44L309.5 23l-11.78 43.97c-27-5.925-55.02-6.05-82.064-.376L203.97 23zm201.56 85L297.25 298.313l-.75.437-40.844-40.875-148.72 148.72-2.186 1.25 109.125-191.75 41.78 41.78L405.532 108zm-149.686 10.594c21.858 0 43.717 5.166 63.594 15.47l-116.625 66.342-2.22 1.28-1.28 2.22-66.25 116.406c-26.942-52.04-18.616-117.603 25.03-161.25 26.99-26.988 62.38-40.468 97.75-40.468zm122.72 74.594c26.994 52.054 18.67 117.672-25.002 161.343-43.66 43.662-109.263 52.005-161.312 25.033l116.438-66.282 2.25-1.25 1.25-2.25 66.375-116.592z"></path></svg>',
    VERTICAL_RATE:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>',
    GEO_ALTITUDE:
      '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"></path><path fill="none" d="M0 0h24v24H0V0z"></path></svg>',
  };
  return svg;
}
