// DOM Manipulation
import './style.scss'
import { getAllStateVectorsByTime, getMap }  from './api.js'



const BASE_URL = "https://opensky-network.org/api/states/all?time="
const timeControl = document.getElementById('time-input__input')
//[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
timeControl.addEventListener('input',() => {
    document.querySelector('input[type="time"]');
    const date = new Date(timeControl.value)
    const seconds = Math.floor( date / 1000);//[Get the number of seconds since the ECMAScript Epoch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#get_the_number_of_seconds_since_the_ecmascript_epoch)
})

getMap()


// const timeControl = d

// const date = 
// const epochTime = date.getTime();
// console.log(epochTime);
// getAllStateVectorsByTime("get", BASE_URL + )

// getAllStateVectors( // Get all flights for input time and origin SA https://opensky-network.org/api/states/all?time=1677164400
//     "get", 
//     BASE_URL + "1677164400" // Thu Feb 23 2023 15:00:00 GMT+0000
// )

    // if (!isNaN(currentlySelectedTime)){
    //     previouslySelectedTime = currentlySelectedTime.value
    // }
    // currentlySelectedTime = previouslySelectedTime
    
    // var currentlySelectedTime = new Date(`1970-01-01T${timeControl.value}:00`)
    // var epochTime = currentlySelectedTime.getTime()
    // console.log(epochTime)
    // console.log(previouslySelectedTime)






// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

