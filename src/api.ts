import { Observable, map, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { IFlightAPIResponse, IFlightDetails } from "./models/flight";



const BASE_URL = "https://opensky-network.org/api/states/all?extended=1&time=";

export function getFirst20FlightDetails(timeInMilliseconds: number): Observable<any> {
    {
        // showSpinner();
        const flightDetails$ = fromFetch(`${BASE_URL}${timeInMilliseconds}`).pipe(
            switchMap((response) => {
                // if (response.ok) {
                //     // hideSpinner();
                return response.json() as Promise<IFlightAPIResponse>;
                // } else {
                //     return of({ error: true, message: `Error ${response.status}` });
                // }
            }),
            map((result) => {
                const flights = result.states.map((state) => {
                    const flight: IFlightDetails = {
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
                return flights;
            }))

        return flightDetails$;
    }
}