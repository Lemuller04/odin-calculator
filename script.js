const result = document.querySelector("#result-line");
const buttons = document.querySelectorAll(".button");
let res = "", firstN = "", secondN = "", operator = "";
let [firstPartDefined, secondPartDefined, operatorPartDefined] = [false, false, false];
const operators = ["/", "*", "+", "-"];
let operationResult;

buttons.forEach((button) => button.onclick = () => {
    res += button.textContent;
    let input = button.textContent;

    if (button.textContent === "C") {
        [firstPartDefined, secondPartDefined, operatorPartDefined] = [false, false, false];
        res = "";
        result.textContent = "0";
        return;
    } else if (operators.includes(input) && !operatorPartDefined) {
        operator = input;
        operatorPartDefined = true;
        firstPartDefined = true;
    } else if (!firstPartDefined) {
        firstN += input;
    } else if (isNum(input) || input === ".") {
        secondN += input;
    }

    result.textContent = `${res}`;

    if (input === "=") {
        operate();
        result.textContent = `${operationResult}`;
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
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}