import 'leaflet/dist/leaflet.css';
import { switchMap } from 'rxjs';
import { getTimeInMillisecondsOnTimeInputEvent } from './app/components/timeInput/timeInput';
import { getFirst20FlightDetails } from './src/api';
import { manipulateDOM } from "./src/dom";

manipulateDOM();

getTimeInMillisecondsOnTimeInputEvent()
    .pipe(
        switchMap((timeInMilliseconds) =>
            getFirst20FlightDetails(timeInMilliseconds))
    ).subscribe((details) => {
        //Understand control flow
    })






