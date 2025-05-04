let operator = "";
let left_number = 0;
let right_number = 0;
let display_text = "";
let is_dot_clicked = false;
let is_evaluated = false;

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
    default:
      return left_number;
  }
}

function resetState() {
  operator = "";
  left_number = 0;
  right_number = 0;
  display_text = "";
  is_dot_clicked = false;
}

function shouldItDisplay(button, class_type) {
  if (class_type === "dot" && !is_dot_clicked) {
    is_dot_clicked = true;
    return true;
  }
  if (class_type === "number" && display_text === "0") {
    if (button.textContent !== "0") {
      display_text = "";
      return true;
    }
    return false;
  }
  return display_text.length < 9 && class_type === "number";
}

function evaluate() {

  if (display_text == "") {
    right_number = 0;
  } else {
    right_number = Number(display_text);
  }

  if (operator === "/" && right_number === 0) {
    display_text = "ERROR";
    return;
  }

  display_text = checkForDisplayOverflow(operate(operator, left_number, right_number));

  left_number = Number(display_text);
  right_number = 0;
  operator = "";
  is_evaluated = true;
}

function checkForDisplayOverflow(num) {
  let number = Number(num);
  if (Number.isInteger(number)) {
    if (number > 999999999) {
      return "999999999";
    }
    return number + "";
  } else {
    let temp = number + "";
    temp = temp.split("");
    console.log()
    if (temp.length > 8) {
      for (let i = temp.length; i > 8; --i) {
        temp.pop();
      }
    }
    return temp.join("");
  }
}


function calculator() {
  const buttons = document.querySelectorAll("button");
  const display = document.querySelector(".text");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {

      let class_type = button.getAttribute("class");

      if (class_type === "backspace") {
        if (display_text !== "") {
          let temp = display_text.split("");
          temp.pop();
          display_text = temp.join("");
          display.textContent = display_text;
        }
      }

      if (is_evaluated && class_type === "number") {
        display_text = "";
        display.textContent = display_text;
        is_evaluated = false;
      }

      if (class_type === "clear") {
        resetState();
        display.textContent = display_text;
      }

      if (shouldItDisplay(button, class_type)) {
        display_text += button.textContent;
        display.textContent = display_text;
      }

      if (class_type === "operator") {
        if (operator !== "") {
          evaluate();
          display.textContent = display_text;
        }

        if (display_text !== "")
          left_number = Number(display_text);
        
        operator = button.textContent;
        display_text = "";
        is_dot_clicked = false;
      }

      if (class_type === "evaluate") {
        evaluate();
        display.textContent = display_text;
      }

      if (display.textContent === "ERROR") {
        resetState();
      }
    });
  });
}

calculator();
