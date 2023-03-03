// OBSERVER and EMITTER 

import { filter, map, switchMap } from 'rxjs'
import { allFlightsStream$, dateTimeInMillisecondsStream$ } from '../main'
import { Utils } from '../utils'
import { getFirst20FlightDetails } from './api'

dateTimeInMillisecondsStream$.pipe(
    filter((dateTime) => dateTime !== ""),
    map((dateTime) => Utils.convertDateTimeToLocalUnixTimestampInSeconds(dateTime)),
    switchMap((dateTimeInMilliseconds) => getFirst20FlightDetails(dateTimeInMilliseconds))
).subscribe((flightDetails) => allFlightsStream$.next(flightDetails))

