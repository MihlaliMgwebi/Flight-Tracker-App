// CONTROL FLOW

import { BehaviorSubject } from "rxjs";
import { IFlights } from "./models/flight";

const dateTimeInMillisecondsStream$: BehaviorSubject<string> = new BehaviorSubject<string>('');
const allFlightsStream$: BehaviorSubject<IFlights | undefined> = new BehaviorSubject<IFlights | undefined>(undefined);
const selectedFlightStream$: BehaviorSubject<string> = new BehaviorSubject<string>("");
