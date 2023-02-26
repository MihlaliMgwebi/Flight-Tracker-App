import { appendTimeInputToParent } from "../timeInput/timeInput";

export function createApp() {
    // create app container 
    const app: HTMLDivElement = document.createElement("div");
    app.id = "app";

    // append children to app
    appendTimeInputToParent(app);

    //append app to body
    const body: HTMLBodyElement = document.querySelector("body") as HTMLBodyElement;
    body.appendChild(app);

}