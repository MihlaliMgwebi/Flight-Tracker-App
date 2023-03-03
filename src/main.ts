// CONTROL FLOW

import { BehaviorSubject } from "rxjs";
import { IFlights } from "./models/flight";

export const dateTimeInMillisecondsStream$: BehaviorSubject<string> = new BehaviorSubject<string>('');
export const allFlightsStream$: BehaviorSubject<IFlights | undefined> = new BehaviorSubject<IFlights | undefined>(undefined);
export const selectedFlightStream$: BehaviorSubject<string> = new BehaviorSubject<string>("");

