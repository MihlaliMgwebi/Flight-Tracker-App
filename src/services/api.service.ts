import { Observable, concatMap, map, of, switchMap, take, timer } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { IFlight, IFlightAPIResponse, IFlights } from '../models/flight';

const BASE_URL: string = "https://opensky-network.org/api/states/all?extended=1&time=";

function isIFlightAPIResponse(result: IFlightAPIResponse | { error: boolean; message: string; }): result is IFlightAPIResponse {
    return Object.keys(result).includes("states")
}

export function pollFirst20FlightDetails(timeInMilliseconds: number): Observable<IFlights> {
    const localStorageKey: string = `pollFirst20FlightDetails:${timeInMilliseconds}`;
    const cachedResponse: string | null = localStorage.getItem(localStorageKey);

    return timer(0, 16000).pipe(
        take(10),
        concatMap(() =>
            fromFetch(`${BASE_URL}${timeInMilliseconds}`).pipe(
                switchMap((response: Response) => {
                    return (response.ok) ?
                        response.json() as Promise<IFlightAPIResponse>//[Zod](https://github.com/colinhacks/zod#basic-usage)
                        :
                        of({ error: true, message: `Error ${response.status}` });
                }),
                map((result: IFlightAPIResponse | { error: boolean; message: string; }) => {
                    if (isIFlightAPIResponse(result)) { //[User Defined Type Guard](https://stackoverflow.com/questions/12789231/class-type-check-in-typescript/40718205#40718205)
                        const flights: IFlights =
                        {
                            flights: result.states.slice(0, 20).map((state) => {
                                const flight: IFlight = {
                                    icao24: state[0] as string ?? "",
                                    callsign: state[1] as string ?? "",
                                    origin_country: state[2] as string ?? "",
                                    time_position: state[3] as number ?? 0,
                                    last_contact: state[4] as number ?? 0,
                                    longitude: state[5] as number ?? 0,
                                    latitude: state[6] as number ?? 0,
                                    baro_altitude: state[7] as number ?? 0,
                                    on_ground: state[8] as boolean ?? false,
                                    velocity: state[9] as number ?? 0,
                                    true_track: state[10] as number ?? 0,
                                    vertical_rate: state[11] as number ?? 0,
                                    sensors: state[12] as number[] ?? null,
                                    geo_altitude: state[13] as number ?? 0,
                                    squawk: state[14] as string ?? "",
                                    spi: state[15] as boolean ?? false,
                                    position_source: state[16] as number ?? 0,
                                    category: state[17] as number ?? 0
                                }
                                return flight;
                            })
                        }
                        localStorage.setItem(localStorageKey, JSON.stringify(flights));
                        return flights;
                    }
                    else { // if error mesage
                        if (cachedResponse) {
                            try {
                                const cachedFlights: IFlights = JSON.parse(cachedResponse);
                                return cachedFlights;
                            } catch (e) {
                                const message: string = `Failed to parse cached response: ${e}`;
                                console.error(message)
                            }
                        }
                        const emptyObject: IFlights = { flights: [] };
                        const message: string = `No flights available: ${result.message}`;
                        console.error(message);
                        return emptyObject;
                    }
                })
            )
        )
    );
}