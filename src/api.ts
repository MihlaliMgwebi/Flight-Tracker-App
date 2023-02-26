import { Observable, map, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { IFlight, IFlightAPIResponse, IFlights } from "./models/flight";



const BASE_URL = "https://opensky-network.org/api/states/all?extended=1&time=";

export function getFirst20FlightDetails(timeInMilliseconds: number): Observable<any> {
    {
        console.log(timeInMilliseconds)
        // showSpinner();
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
                    flights: data.states.map((state) => {
                        const flight: IFlight = {
                            icao24: state["icao24"] as string ?? null,
                            callsign: state["callsign"] as string ?? null,
                            origin_country: state["origin_country"] as string ?? null,
                            time_position: state["time_position"] as number ?? null,
                            last_contact: state["last_contact"] as number ?? null,
                            longitude: state["longitude"] as number ?? null,
                            latitude: state["latitude"] as number ?? null,
                            baro_altitude: state["baro_altitude"] as number ?? null,
                            on_ground: state["on_ground"] as boolean ?? null,
                            velocity: state["velocity"] as number ?? null,
                            true_track: state["true_track"] as number ?? null,
                            vertical_rate: state["vertical_rate"] as number ?? null,
                            sensors: state["sensors"] as number[] ?? null,
                            geo_altitude: state["geo_altitude"] as number ?? null,
                            squawk: state["squawk"] as string ?? null,
                            spi: state["spi"] as boolean ?? null,
                            position_source: state["position_source"] as number ?? null,
                            category: state["category"] as number ?? null
                        }
                        return flight;
                    })
                }
                return flights;
            })
        )
        return flightDetails$;
    }
}


