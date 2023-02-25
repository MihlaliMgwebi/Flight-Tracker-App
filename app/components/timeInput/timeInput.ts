function createTimeInputLabel(): HTMLLabelElement {
    const timeInputLabel = document.createElement("label");
    timeInputLabel.htmlFor = "time-input__input-value";
    timeInputLabel.textContent = "Select a day and time for your flight:";
    return timeInputLabel;
}

function createTimeInput(): HTMLInputElement {
    const timeInput = document.createElement("input");
    timeInput.id = "time-input__input-value";
    timeInput.type = "datetime-local";
    timeInput.name = "time-input__input-value";
    timeInput.required = true;
    disableHistoricDates(timeInput);// user can only select dates from tomorrow onwards
    return timeInput;
}

function createTimeInputContainer(): HTMLDivElement {
    const timeInputContainer = document.createElement("div");
    timeInputContainer.id = "time-input__input";
    timeInputContainer.classList.add("app-header__time-input");
    timeInputContainer.appendChild(createTimeInputLabel());
    timeInputContainer.appendChild(createTimeInput());
    return timeInputContainer;
}

function disableHistoricDates(timeInput: HTMLInputElement): void {
    //[Tomorrow time](https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
    const day = tomorrow.getDate().toString().padStart(2, "0");
    const hours = "00";
    const minutes = "00";
    const tomorrowDate = `${year}-${month}-${day}T${hours}:${minutes}`;

    timeInput.setAttribute("min", tomorrowDate);
}

export function getTimeInput(parentElement: HTMLElement): void {
    parentElement.appendChild(createTimeInputContainer());
}

