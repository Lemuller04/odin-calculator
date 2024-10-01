const result = document.querySelector("#result-line");
const buttons = document.querySelectorAll(".button");
const operators = "+-/*"; // Possible operations
const numbers = "0123456789"; // Possible numbers ;~;

// Set default values (empty strings)
let operator = "";
let firstN = {value: ""};
let secondN = {value: ""};

// Set some state variable
let firstPartDefined = false;
let secondPartDefined = false;
let operatorPartDefined = false;
let placeholder = true;
let firstDigit = true;
let operatorJustDefined = false;

buttons.forEach((button) => button.onclick = () => {
    // This is to remove the default zero on the result element
    if (placeholder) {
        result.textContent = "";
        placeholder = false;
    }
    
    // Defining the operator
    if (operators.includes(button.textContent) && !operatorPartDefined) {
        console.log("updating operator");
        updateOperator(button.textContent);
        updateResultElement();
    }
    
    // Defining the first number
    if (!firstPartDefined) {
        console.log("updating n1");
        updateNumberPart(firstN, button.textContent);
        updateResultElement();
    }
    
    // Defining the second number
    if (firstPartDefined && operatorPartDefined && !secondPartDefined) {
        console.log("updating n2");
        updateNumberPart(secondN, button.textContent);
        updateResultElement();
        operatorJustDefined = false;
    }
    
    // When "=" pressed
    if (button.textContent === "=" && firstPartDefined && operatorPartDefined) {
        processEqualsButton();
        console.log("equals pressed");
    }
    
    // Placing the default zero on the result element if there's nothing there
    if (!placeholder && result.textContent.length === 0) {
        console.log("Resetting placeholder");
        result.textContent = "0";
        placeholder = false;
    }
    
    // Clear
    if (button.textContent === "C") {
        console.log("clearing");
        reset();
    }
});

function processEqualsButton() {
    // If the second number is invalid, make it zero
    if (secondN.value.length === 0 || secondN.value === "."|| secondN.value === "-"|| secondN.value === "-.") {
        secondN.value = "0";
    }
    secondPartDefined = true;
    updateResultElement(true);
}

function updateNumberPart(n, btn) {
    // If "-" is pressed and it's the first digit, let it be a negative number
    if (btn === "-" && firstDigit && !operatorJustDefined) {
        n.value += btn;
        firstDigit = false;
        return;
    }
    
    // If "." is pressed and there's no "." yet, let it be a real number
    if (btn === "." && !n.value.includes(".")) {
        n.value += btn;
        firstDigit = false;
        return;
    }

    // Kinda lazy number checking
    if (numbers.includes(btn)) {
        n.value += btn;
        firstDigit = false;
        return;
    }
}

function updateOperator(btn) {
    if (firstDigit && btn === "-") {
        // Allows for the "-" operator to be used after a operation happened
        if (firstN.value !== "" && operator === "") {
            operator = btn;
            operatorPartDefined = true;
            firstPartDefined = true;
            firstDigit = true;
            operatorJustDefined = true;
            return;
        }
        return;
    }

    // If the first number is invalid, make it zero
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
    } else { // When final = true it means the "=" button was pressed
        let res = operate();
        
        operator = "";
        firstN.value = String(res);
        secondN = {value: ""};
        secondPartDefined = false;
        operatorPartDefined = false;
        operatorJustDefined = false;
        firstDigit = true;

        result.textContent = `${res}`;
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
    operator = "";
    firstN = {value: ""};
    secondN = {value: ""};
    firstPartDefined = false;
    secondPartDefined = false;
    operatorPartDefined = false;
    placeholder = true;
    firstDigit = true;
    result.textContent = "0";
    operatorJustDefined = false;
}