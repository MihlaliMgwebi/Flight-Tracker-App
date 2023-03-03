import { map } from "rxjs";
import { allFlightsStream$, selectedDateTimeInMillisecondsStream$ } from "../main";
import { pollFirst20FlightDetails } from "./api.service";

export function handleDateTimeOnInput() {//shorten
    const dateTimePicker: HTMLInputElement | HTMLElement | null = document.getElementById('time-input__input-value');
    if (dateTimePicker && dateTimePicker instanceof HTMLInputElement) {
        setDateTimeInputMinDateToTomorrow(dateTimePicker)
        dateTimePicker.oninput = (dateTimeEvent) => {
            const dateTime: string = (dateTimeEvent.target as HTMLInputElement)?.value
            selectedDateTimeInMillisecondsStream$.next(dateTime)
        }
    }
}

export function convertDateTimeToLocalUnixTimestampInSeconds(dateTimeInputValue: string): number {
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

// STEP 2. poll flights using the data time input emitted
selectedDateTimeInMillisecondsStream$.pipe(
    map((dateTime) => convertDateTimeToLocalUnixTimestampInSeconds(dateTime))
).subscribe(
    (dateTimeInMilliseconds: number) => {
        if (!isNaN(dateTimeInMilliseconds))
            pollFirst20FlightDetails(dateTimeInMilliseconds)
                .subscribe((flightDetails) => { allFlightsStream$.next(flightDetails) })
    })

