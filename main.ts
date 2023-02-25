// Still unsure where to put my observables lol

import { createApp } from './app/components/apps/app';

createApp();

// loadFlight
// import { subscribeToTimeInputChange } from './app/components/timeInput/timeInput';
// import { Utils } from './utils';
// subscribeToTimeInputChange().subscribe((inputEvent: InputEvent) => {
//     const timeHTMLInputElement: HTMLInputElement = inputEvent.target as HTMLInputElement;
//     const dateTime: string = timeHTMLInputElement.value;
//     const localUnixTimestampInSeconds = Utils.convertDateTimeToLocalUnixTimestampInSeconds(dateTime);
//     console.log(localUnixTimestampInSeconds);
// });
