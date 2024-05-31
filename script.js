const result = document.querySelector("#result-line");
const buttons = document.querySelectorAll(".button");
let res = "", firstN = "", secondN = "", operator = ""; // SET DEFAULT VALUES (EMPTY STRINGS)
let [firstPartDefined, secondPartDefined, operatorPartDefined] = [false, false, false]; // VALUES HAVE NOT BEEN SET
const operators = ["/", "*", "+", "-", "%"]; // POSSIBLE OPERATIONS
let operationResult;

buttons.forEach((button) => button.onclick = () => {
    res += button.textContent;
    let input = button.textContent;

    // CLEAR
    if (button.textContent === "C") {
        [firstPartDefined, secondPartDefined, operatorPartDefined] = [false, false, false]; // RESET VALUES TO NOT BE SET
        res = "", firstN = "", secondN = "", operator = ""; // RESET VARIABLES TO DEFAULT
        result.textContent = "0";
        return;
    } else if (operators.includes(input) && !operatorPartDefined) { // SETS THE OPERATOR
        operator = input;
        operatorPartDefined = true;
        firstPartDefined = true;
    } else if (!firstPartDefined) { // SETS FIRST NUMBER
        firstN += input;
    } else if (isNum(input) || input === ".") { // SETS SECOND NUMBER
        secondN += input;
    }

    result.textContent = `${res}`;

    if (input === "=") {
        operate();
        result.textContent = `${operationResult}`;
        res = "", firstN = "", secondN = "", operator = ""; // RESET VARIABLES TO DEFAULT
        [firstPartDefined, secondPartDefined, operatorPartDefined] = [false, false, false]; // RESET VALUES TO NOT BE SET
    }

});

function operate() {
    switch (operator) {
        case "+":
            operationResult = add(firstN, secondN);
            break;
        case "-":
            operationResult = subtract(firstN, secondN);
            break;
        case "*":
            operationResult = multiply(firstN, secondN);
            break;
        case "/":
            operationResult = divide(firstN, secondN);
            break;
        case "%":
            operationResult = percentage(firstN, secondN);
            break;
    }
}

function isNum(num) {
    for (let i = 0; i < num.length; i++) {
        if (!(num[i].charCodeAt() > 47 && num[i].charCodeAt() < 58)) {
            return false;
        }
    }
    return true;
}

function add(a, b) {
    return (parseFloat(a) + parseFloat(b)).toFixed(2);
}

function subtract(a, b) {
    return (parseFloat(a) - parseFloat(b)).toFixed(2);
}

function multiply(a, b) {
    return (parseFloat(a) * parseFloat(b)).toFixed(2);
}

function divide(a, b) {
    return (parseFloat(a) / parseFloat(b)).toFixed(2);
}

function percentage(a, b) {
    return (parseFloat(a) / 100 * parseFloat(b)).toFixed(2);
}