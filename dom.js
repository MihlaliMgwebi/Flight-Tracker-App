// DOM Manipulation

export function loadFlights() {
  //[Setting the value using JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#setting_the_value_using_javascript)
  const timeControl = document.getElementById("time-input__input");
  // [Anonymous functions to pass parameters](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)
  timeControl.addEventListener("input", () => {
    toggleFlightsVisibility();
  });
}

function toggleFlightsVisibility() {
  const toggleClass = "app-main__flights";
  const menu = document.getElementById(toggleClass);
  menu.classList.remove(`${toggleClass}--hidden`);
}
