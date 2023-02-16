//[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
export function setUnixTimestampInMilliseconds() {
  const timeControl = document.getElementById("time-input__input");
  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener(
    "input",
    () =>
      (timeControl.dataset.epoch = convert24HrTimeToUnixTimestampInMilliseconds(
        timeControl.value
      ))
  );
}

function convert24HrTimeToUnixTimestampInMilliseconds(timeControlValue) {
  console.log(timeControlValue);
  const date = new Date(timeControlValue);
  const seconds = Math.floor(date / 1000);
  return seconds;
}
// Click the time
// Call API and load results

//     Id = "3c6444", //0
//     Callsign = "DLH9LF  ", //1
//     OriginCountry = "Germany",//2
//     Longitude = 6.1546,//5
//     Latitude = 50.1964,//6
//     IsOnGround = false,//8
//     TrueTrackCompass = 98.26,//10
//     Category = 1,//17
