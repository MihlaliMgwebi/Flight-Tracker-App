import { BehaviorSubject, fromEvent } from 'rxjs';
import { IFlights } from './models/flight';
import { defaultDateTimeInputMinDateToTomorrow } from './services/dom.service';
import './style.css';

export const setUpDomWhenPageLoadedOrReloaded$ = fromEvent(window, 'load');
export const dateTimePickerOnInput$ = fromEvent(document, 'input');
export const dateTimeInMillisecondsStream$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
export const selectedFlightStream$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
export const allFlightsStream$: BehaviorSubject<IFlights | undefined> = new BehaviorSubject<IFlights | undefined>(undefined);
export const zoomToPostitionOnMap$: BehaviorSubject<{ latitude: number | null | undefined, longitude: number | null | undefined } | undefined> = new BehaviorSubject<{ latitude: number | null | undefined, longitude: number | null | undefined } | undefined>(undefined);

// STEP 1:  Set Up DOM
setUpDomWhenPageLoadedOrReloaded$.subscribe(_ => {
  defaultDateTimeInputMinDateToTomorrow();
})



