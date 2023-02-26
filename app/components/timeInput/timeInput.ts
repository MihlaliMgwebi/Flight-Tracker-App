import { Observer, fromEvent } from "rxjs";
import { getFirst20FlightDetails } from "../../../src/api";
import { Utils } from "../../../utils";

// functions
function createTimeInputLabel(): HTMLLabelElement {
    const timeInputLabel: HTMLLabelElement = document.createElement("label");
    timeInputLabel.htmlFor = "time-input__input-value";
    timeInputLabel.textContent = "Select a day and time for your flight:";
    return timeInputLabel;
}

function createTimeInput(): HTMLInputElement {
    const timeInput: HTMLInputElement = document.createElement("input");
    timeInput.id = "time-input__input-value";
    timeInput.type = "datetime-local";
    timeInput.name = "time-input__input-value";
    timeInput.required = true;

    setDateTimeInputMinDateToTomorrow(timeInput);

    return timeInput;
}

function createTimeInputContainer(): HTMLDivElement {
    const timeInputContainer: HTMLDivElement = document.createElement("div");
    timeInputContainer.id = "time-input__input";
    timeInputContainer.classList.add("app-header__time-input");
    timeInputContainer.appendChild(createTimeInputLabel());
    timeInputContainer.appendChild(createTimeInput());
    return timeInputContainer;
}

function setDateTimeInputMinDateToTomorrow(timeInput: HTMLInputElement): void {
    //[Tomorrow time](https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/)
    const tomorrow: Date = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
    const day = tomorrow.getDate().toString().padStart(2, "0");
    const hours = "00";
    const minutes = "00";
    const tomorrowDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    timeInput.setAttribute("min", tomorrowDate);
}

function getTimeHTMLInputElement(): HTMLInputElement {
    return document.getElementById('time-input__input-value') as HTMLInputElement;
}

export function appendTimeInputToParent(parentElement: HTMLDivElement): void {
    parentElement.appendChild(createTimeInputContainer());
}

function getTimeInMillisecondsOnTimeInputEvent(): Observer<Event> {
    return {
        next: (event) => {
            if (event && event.target) {
                const timeHTMLInputElement: HTMLInputElement = event.target as HTMLInputElement;
                const dateTime: string = timeHTMLInputElement.value;
                const localUnixTimestampInSeconds = Utils.convertDateTimeToLocalUnixTimestampInSeconds(dateTime);
                getFirst20FlightDetails(localUnixTimestampInSeconds);
                return localUnixTimestampInSeconds;
            }


        },
        error: (error) => console.error(error),
        complete: () => console.log('Observer completed'),
    };
}

export function subscribeToTimeInputChange(): void {
    fromEvent(getTimeHTMLInputElement(), 'input').subscribe(getTimeInMillisecondsOnTimeInputEvent());
}
