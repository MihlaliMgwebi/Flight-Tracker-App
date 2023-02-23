import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

const timeControl = document.getElementById("time-input__input-value");
export const emitTimeInMilliseconds$ = fromEvent(timeControl, "input").pipe(
  map((event) => event.target.value),
  map((seconds) => seconds * 1000)
);
