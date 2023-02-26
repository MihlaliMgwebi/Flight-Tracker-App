
export interface IFlightAPIResponse {
    time: number,
    states: IFlight[] | null;
}

interface IMap {
    icao24: string;
    longitude: number | null;
    latitude: number | null;
}

//[Extend interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html#extending-interfaces)
interface IFlight extends IMap {
    [index: number]: number | number[] | boolean | string | null;//[Numeric Indexing] https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types
    callsign: string | null;
    origin_country: string;
    time_position: number | null;
    last_contact: number;
    baro_altitude: number | null;
    on_ground: boolean;
    velocity: number | null;
    true_track: number | null;
    vertical_rate: number | null;
    sensors: number[] | null;
    geo_altitude: number | null;
    squawk: string | null;
    spi: boolean;
    position_source: number | null;
    category?: number
}

export interface IFlights {
    flights: IFlight[] | null;
}

