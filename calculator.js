let operator;
let left_number;
let right_number;
let display_text = "";

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

function shouldItDisplay(button) {
  console.log(display_text.length);
  return display_text.length < 9 
         && button.getAttribute("class") === "number";
}

function calculator() {
  const buttons = document.querySelectorAll("button");
  const display = document.querySelector(".text");
  buttons.forEach((button) => {
    let is_number = button.getAttribute("class") === "number";
    button.addEventListener("click", () => {
      if (shouldItDisplay(button)) {
        display_text += button.textContent;
        display.textContent = display_text;
      }
    });
  });
}

calculator();
