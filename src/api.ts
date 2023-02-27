import { Subject, map, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { getTimeInMillisecondsOnTimeInputEvent } from '../app/components/timeInput/timeInput';
import { IFlight, IFlightAPIResponse, IFlights } from "./models/flight";


const BASE_URL = "https://opensky-network.org/api/states/all?extended=1&time=";

export function getFirst20FlightDetails(): Subject<IFlights | null> {
    let timeInMilliseconds: number = 0;
    const timeInMillisecondsOnTimeInputSubscription = getTimeInMillisecondsOnTimeInputEvent().subscribe((value) => {
        timeInMilliseconds = value;
    });
    timeInMillisecondsOnTimeInputSubscription.unsubscribe(); //ASK WHY IT DIN"T SUBSCRIBE CHILE. UNSUBSCRIBING GETS MESSY W/ others
    const flightDetails$ = fromFetch(`${BASE_URL}${timeInMilliseconds}`).pipe(
        switchMap((response) => {
            if (response.ok) {
                //     // hideSpinner();
                return response.json() as Promise<IFlightAPIResponse>;
            } else {
                return of({ error: true, message: `Error ${response.status}` });
            }
        }),
        map((result) => {
            const data: IFlightAPIResponse | { error: boolean; message: string; } = result;
            if (!("states" in data) || !data.states)
                return null;

            const flights: IFlights =
            {
                flights: data.states.slice(0, 20).map((state) => {
                    const flight: IFlight = {
                        icao24: state[0] as string ?? null,
                        callsign: state[1] as string ?? null,
                        origin_country: state[2] as string ?? null,
                        time_position: state[3] as number ?? null,
                        last_contact: state[4] as number ?? null,
                        longitude: state[5] as number ?? null,
                        latitude: state[6] as number ?? null,
                        baro_altitude: state[7] as number ?? null,
                        on_ground: state[8] as boolean ?? null,
                        velocity: state[9] as number ?? null,
                        true_track: state[10] as number ?? null,
                        vertical_rate: state[11] as number ?? null,
                        sensors: state[12] as number[] ?? null,
                        geo_altitude: state[13] as number ?? null,
                        squawk: state[14] as string ?? null,
                        spi: state[15] as boolean ?? null,
                        position_source: state[16] as number ?? null,
                        category: state[17] as number ?? null
                    }
                    return flight;
                })
            }
            return flights;
        })
    )
    return <Subject<IFlights | null>>flightDetails$;
}

