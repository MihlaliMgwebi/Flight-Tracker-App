// CONTROL FLOW
// The user enters a time in the input field on the web page.
// An event listener is attached to the input field, which triggers a function when the user clicks the "submit" button or presses "Enter" on their keyboard.
// The function reads the value of the input field and converts it into a date object that can be used to filter a list of marker data.
// The function retrieves the marker data from a server using an API request. This data includes the location, name, and other relevant information for each marker.
// The function then loops through the marker data and creates a marker object for each location using a mapping library like Google Maps or Leaflet. Each marker is also given a click event listener that will trigger a function to display more information when the marker is clicked.
// The function then displays the map on the web page and adds the markers to the map.
// When a user clicks on a marker, the click event listener attached to the marker triggers a function that displays more information about the location, such as a description, images, and reviews. This information is retrieved from a server using another API request.
// If the user clicks on a button to zoom to the marker, another function is triggered that zooms the map to the selected marker's location.
// The user can then explore the map and view information about each location by clicking on markers and buttons.
// import 'leaflet/dist/leaflet.css';
// import { switchMap } from 'rxjs';
// import { getTimeInMillisecondsOnTimeInputEvent } from './app/components/timeInput/timeInput';
// import { getFirst20FlightDetails } from './src/api';
// import { manipulateDOM } from "./src/dom";

// manipulateDOM();

// getTimeInMillisecondsOnTimeInputEvent()
//     .pipe(
//         switchMap((timeInMilliseconds) =>
//             getFirst20FlightDetails(timeInMilliseconds))
//     ).subscribe((details) => {
//         //Understand control flow
//     })
import { timeInMillisecondsOnTimeInputEventStream$ } from "./app/components/timeInput/timeInput";
timeInMillisecondsOnTimeInputEventStream$.subscribe((timeInMilliseconds: number) => { console.log(timeInMilliseconds); });




