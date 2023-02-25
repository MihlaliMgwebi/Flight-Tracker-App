// Just definition

export interface IFlightAPIResponse {
    time: number,
    // states: <keyof, IFlightDetails>() => [][]
    states: (string | number | boolean | number[])[][]
}

export interface IFlightDetails {
    icao24: string,
    callsign: string,
    origin_country: string,
    time_position: number,
    last_contact: number,
    longitude: number,
    latitude: number,
    baro_altitude: number,
    on_ground: boolean,
    velocity: number,
    true_track: number,
    vertical_rate: number,
    sensors: number[],
    geo_altitude: number,
    squawk: string,
    spi: boolean,
    position_source: number,
    category: number

}

// export interface arrays {
//     letters: string[],
//     ages: Array<number>,
//     person: string | IPerson;
//     people: (string | IPerson)[];
// }

// interface IPerson { //interface can now be type
//     name: string;
// }
