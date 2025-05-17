document.addEventListener("DOMContentLoaded", function () {
  const result = document.getElementById("result");
  const history = document.getElementById("history");
  const buttons = document.querySelectorAll(".btn");
  let currentInput = "0";
  let previousInput = "";
  let operation = null;
  let resetScreen = false;

  function updateDisplay() {
    result.value = currentInput;
  }
  function appendNumber(number) {
    if (currentInput === "0" || resetScreen) {
      currentInput = number;
      resetScreen = false;
    } else {
      currentInput += number;
    }
  }

  function addDecimal() {
    if (resetScreen) {
      currentInput = "0.";
      resetScreen = false;
      return;
    }
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
  }

  function handleOperation(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
    history.textContent = `${previousInput} ${operation}`;
  }

  function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "%":
        computation = prev % current;
        break;
      default:
        return;
    }

    currentInput = computation.toString();
    operation = null;
    history.textContent = "";
  }

  function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
  }

  function percentage() {
    currentInput = parseFloat(currentInput) / 100;
  }

  function clear() {
    currentInput = "0";
    previousInput = "";
    operation = null;
    history.textContent = "";
  }

  function backspace() {
    if (
      currentInput.length === 1 ||
      (currentInput.length === 2 && currentInput.startsWith("-"))
    ) {
      currentInput = "0";
    } else {
      currentInput = currentInput.slice(0, -1);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.value;

      button.classList.add("active");
      setTimeout(() => button.classList.remove("active"), 100);

      if (!isNaN(value) || value === ".") {
        if (value === ".") {
          addDecimal();
        } else {
          appendNumber(value);
        }
        updateDisplay();
      } else if (["+", "-", "*", "/", "%"].includes(value)) {
        handleOperation(value);
        updateDisplay();
      } else if (value === "=") {
        calculate();
        updateDisplay();
      } else if (value === "C") {
        clear();
        updateDisplay();
      } else if (value === "+/-") {
        toggleSign();
        updateDisplay();
      } else if (value === "%") {
        percentage();
        updateDisplay();
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
      const button =
        document.querySelector(`.btn-number[value="${e.key}"]`) ||
        document.querySelector(
          `.btn-number[value="${e.key === "." ? "." : ""}"]`
        );
      if (button) button.click();
    } else if (["+", "-", "*", "/", "%"].includes(e.key)) {
      const op = e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key;
      const button = document.querySelector(`.btn-operation[value="${op}"]`);
      if (button) button.click();
    } else if (e.key === "Enter" || e.key === "=") {
      document.querySelector(".btn-equals").click();
    } else if (e.key === "Escape") {
      document.querySelector('.btn-operation[value="C"]').click();
    } else if (e.key === "Backspace") {
      backspace();
      updateDisplay();
    }
  });

  updateDisplay();
});
