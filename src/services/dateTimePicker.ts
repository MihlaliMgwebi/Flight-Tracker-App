import { filter, map, switchMap } from "rxjs";
import { allFlightsStream$, dateTimeInMillisecondsStream$ } from "../main";
import { pollFirst20FlightDetails } from "./api";

function convertDateTimeToLocalUnixTimestampInSeconds(dateTimeInputValue: string): number {
    const MILLISECONDS_IN_SECOND: number = 1000;
    const unixTimestampInMilliseconds: number = Date.parse(dateTimeInputValue);
    const unixTimestampInSeconds: number = unixTimestampInMilliseconds / MILLISECONDS_IN_SECOND;
    return unixTimestampInSeconds;
}

function setDateTimeInputMinDateToTomorrow(timeInput: HTMLInputElement | null): void {
    //[Tomorrow time](https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/)
    const tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
    const day = tomorrow.getDate().toString().padStart(2, "0");
    const hours = "00";
    const minutes = "00";
    const tomorrowDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    timeInput?.setAttribute("min", tomorrowDate);
}

export function emitDateTimeInMillisecondsWhenUserPicksDateTime(): void {
    const dateTimePicker: HTMLInputElement | HTMLElement | null = document.getElementById('time-input__input-value');
    if (dateTimePicker && dateTimePicker instanceof HTMLInputElement) {
        setDateTimeInputMinDateToTomorrow(dateTimePicker)
        dateTimePicker.oninput = (dateTimeEvent) => {
            const dateTime: string = (dateTimeEvent.target as HTMLInputElement)?.value;
            dateTimeInMillisecondsStream$.next(dateTime)
        }
    }
}

dateTimeInMillisecondsStream$.pipe(
    filter((dateTime) => dateTime !== ""),
    map((dateTime) => convertDateTimeToLocalUnixTimestampInSeconds(dateTime)),
    switchMap((dateTimeInMilliseconds) => pollFirst20FlightDetails(dateTimeInMilliseconds))
).subscribe((flightDetails) => allFlightsStream$.next(flightDetails))