let operator = "";
let left_number = 0;
let right_number = 0;
let display_text = "";
let is_dot_clicked = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(op, a, b) {
  switch(op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function resetState() {
  operator = "";
  left_number = 0;
  right_number = 0;
  display_text = "";
  is_dot_clicked = false;
}

function shouldItDisplay(button) {
  const btn_atr = button.getAttribute("class");
  if (btn_atr === "dot" && !is_dot_clicked) {
    is_dot_clicked = true;
    return true;
  }
  if (btn_atr === "number" 
      && button.textContent === "0" 
      && display_text === "0") {
    return false;
  }
  return display_text.length < 9 && btn_atr === "number";
}

function calculator() {
  const buttons = document.querySelectorAll("button");
  const display = document.querySelector(".text");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {

      if (button.getAttribute("id") === "clear") {
        resetState();
        display.textContent = display_text;
      }

      if (shouldItDisplay(button)) {
        display_text += button.textContent;
        display.textContent = display_text;
      }

    });
  });
}

calculator();
