const result = document.querySelector("#result-line");
const buttons = document.querySelectorAll(".button");
let input = "", firstN, secondN, operator;

buttons.forEach((button) => button.onclick = () => {
    input += button.textContent;
    result.textContent = `${input}`
})

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