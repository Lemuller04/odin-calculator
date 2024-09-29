const result = document.querySelector("#result-line");
const buttons = document.querySelectorAll(".button");
const operators = "+-/*"; // POSSIBLE OPERATIONS
const numbers = "0123456789";
let operationResul = 0;

let res = "", operator = ""; // SET DEFAULT VALUES (EMPTY STRINGS)
let firstN = {value: ""};
let secondN = {value: ""};
// INITIAL STATE VARIABLES
let firstPartDefined = false;
let secondPartDefined = false;
let operatorPartDefined = false;
let placeholder = true;
let firstDigit = true;
let operatorJustDefined = false;

buttons.forEach((button) => button.onclick = () => {
    if (placeholder) {
        result.textContent = "";
        placeholder = false;
    }
    
    if (operators.includes(button.textContent) && !operatorPartDefined) {
        updateOperator(button.textContent);
        updateResultElement();
    }
    
    if (!firstPartDefined) {
        updateNumberPart(firstN, button.textContent);
        updateResultElement();
    }
    
    if (firstPartDefined && operatorPartDefined && !secondPartDefined) {
        updateNumberPart(secondN, button.textContent);
        updateResultElement();
        operatorJustDefined = false;
    }
    
    if (button.textContent === "=" && firstPartDefined && operatorPartDefined) {
        processEqualsButton();
    }
    
    if (!placeholder && result.textContent.length === 0) {
        result.textContent = "0";
        placeholder = false;
    }
    
    if (button.textContent === "C") {
        reset();
    }
});

function processEqualsButton() {
    if (secondN.value.length === 0 || secondN.value === "."|| secondN.value === "-"|| secondN.value === "-.") {
        secondN.value = "0";
    }
    secondPartDefined = true;
    updateResultElement(true);
}

function updateNumberPart(n, btn) {
    if (btn === "-" && firstDigit && !operatorJustDefined) {
        n.value += btn;
        firstDigit = false;
        return;
    }
    
    if (btn === "." && !n.value.includes(".")) {
        n.value += btn;
        firstDigit = false;
        return;
    }

    if (numbers.includes(btn)) {
        n.value += btn;
        firstDigit = false;
        return;
    }
}

function updateOperator(btn) {
    if (firstDigit && btn === "-") {
        return;
    }

    if (firstN.value.length === 0 || firstN.value === "-" || firstN.value === "." || firstN.value === "-.") {
        firstN.value = "0";
    }

    operator = btn;
    operatorPartDefined = true;
    firstPartDefined = true;
    firstDigit = true;
    operatorJustDefined = true;
}

function updateResultElement(final=false) {
    if (!final) {
        result.textContent = `${firstN.value + operator + secondN.value}`;
    } else {
        result.textContent = `${operate()}`;
    }
}

function operate() {
    switch (operator) {
        case "+":
            return parseFloat(firstN.value) + parseFloat(secondN.value);
        case "-":
            return parseFloat(firstN.value) - parseFloat(secondN.value);
        case "/":
            if (secondN.value === "0") {
                alert("[ERROR] Can't divide by zero");
                reset();
                return "0";
            }
            return parseFloat(firstN.value) / parseFloat(secondN.value);
        case "*":
            return parseFloat(firstN.value) * parseFloat(secondN.value);
    }
}

function reset() {
    res = "", operator = "";
    firstN = {value: ""};
    secondN = {value: ""};
    firstPartDefined = false;
    secondPartDefined = false;
    operatorPartDefined = false;
    placeholder = true;
    firstDigit = true;
    result.textContent = "0";
}