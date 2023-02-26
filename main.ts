// Still unsure where to put my observables lol

import { createApp } from './app/components/apps/app';
import { subscribeToTimeInputChange } from './app/components/timeInput/timeInput';

createApp();

// call observables (app needs to exist first)
subscribeToTimeInputChange()