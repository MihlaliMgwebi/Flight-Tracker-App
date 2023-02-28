
export interface IFlightAPIResponse {
    time: number,
    states: (boolean | string | number | number[])[][];//check preview in netwrok tab
}


interface IFlight {
    icao24: string;
    callsign: string | null;
    origin_country: string;
    time_position: number | null;
    longitude: number | null;
    latitude: number | null;
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

