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

export function getTimeInput(parentElement: HTMLElement): void {
    parentElement.appendChild(createTimeInputContainer());
}