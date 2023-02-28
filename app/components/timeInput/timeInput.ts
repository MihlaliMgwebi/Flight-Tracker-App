import { Observable, fromEvent, map } from "rxjs";
import { Utils } from "../../../utils";

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

function getTimeHTMLInputElement(): HTMLInputElement {
    const timeHTMLInputElement = document.getElementById('time-input__input-value');
    if (timeHTMLInputElement instanceof HTMLInputElement) {
        setDateTimeInputMinDateToTomorrow(timeHTMLInputElement)
        return timeHTMLInputElement as HTMLInputElement
    }
    return document.createElement('input') as HTMLInputElement //TODO error handling: can't select a time
}

export const timeInMillisecondsOnTimeInputEventStream$: Observable<number> =
    fromEvent(getTimeHTMLInputElement(), 'input').pipe(
        map((event: Event) => {
            return Utils.convertDateTimeToLocalUnixTimestampInSeconds(
                (event.target as HTMLInputElement).value
            );
        }),
    )

