
import { BehaviorSubject } from 'rxjs'; //can subscribe after event occurs, and keeps memory of what has happened.
import { IFlights } from './models/flight';
import { handleDateTimeOnInput } from './services/dateTimePicker-service';

export const selectedDateTimeInMillisecondsStream$: BehaviorSubject<string> = new BehaviorSubject<string>("");
export const allFlightsStream$: BehaviorSubject<IFlights | undefined> = new BehaviorSubject<IFlights | undefined>(undefined);
export const selectedFlightStream$: BehaviorSubject<string> = new BehaviorSubject<string>("");
export const zoomToPostitionOnMap$: BehaviorSubject<{ latitude: number | null | undefined, longitude: number | null | undefined } | undefined> = new BehaviorSubject<{ latitude: number | null | undefined, longitude: number | null | undefined } | undefined>(undefined);

// STEP 1. onInput, emit dateTime 
handleDateTimeOnInput()

