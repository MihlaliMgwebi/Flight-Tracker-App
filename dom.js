const timeControl = document.getElementById("time-input__input");
//[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
timeControl.addEventListener("input", () => {
  document.querySelector('input[type="time"]');
  const date = new Date(timeControl.value);
  const seconds = Math.floor(date / 1000); //[Get the number of seconds since the ECMAScript Epoch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#get_the_number_of_seconds_since_the_ecmascript_epoch)
});
