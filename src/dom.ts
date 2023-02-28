// DOM Manipulation
// import { createMap } from "../app/components/map/map";
// import { appendTimeInputToParent } from "../app/components/timeInput/timeInput";
// export function manipulateDOM() {
//     const header: HTMLElement | null = document.getElementById("app-header")
//     if (header)
//         appendTimeInputToParent(header as HTMLDivElement);

//     createMap()
// }

// //Chile not sure when to show and hide w/ time Input and button
export function showSpinner() {
    document.getElementById("app-main__spinner")!.classList.add("show-spinner");
}

export function hideSpinner() {
    document.getElementById("app-main__spinner")?.classList.remove("show-spinner");
}

