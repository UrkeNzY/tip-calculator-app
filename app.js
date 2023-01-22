const billInputField = document.getElementById("bill-amount");
const billWarning = document.getElementById("bill-warning");

const tipAmountElements = document.querySelectorAll(".tip-percentage");
const tipAmountCustom = document.querySelector("#tip-custom input");

const peopleInputField = document.getElementById("people-number");
const peopleWarning = document.getElementById("people-warning");

const tipAmountResult = document.querySelector("#tip-amount p");
const totalAmountResult = document.querySelector("#total-amount p");

const resetButton = document.querySelector("button");

let bill = 0;
let people = 0;
let tipPercent = 0;

let tipAmount = 0;
let totalAmount = 0;

function getInput(event) {
  let inputValue = event.target.value;
  return inputValue;
}

function getClickedButtonValue(event) {
  let buttonValue;
  let tipString = event.target.textContent;

  event.target.classList.add("selected");

  deselectButtons();
  resetCustomTipField();

  buttonValue = +tipString.slice(0, tipString.indexOf("$"));
  return buttonValue;
}

function deselectButtons() {
  for (const tipAmountElement of tipAmountElements) {
    if (tipAmountElement !== event.target) {
      tipAmountElement.classList.remove("selected");
    }
  }
}

function resetCustomTipField() {
  tipAmountCustom.value = '';
}

billInputField.addEventListener("keyup", getInput);

billInputField.addEventListener("focusout", updateBillValue);
billInputField.addEventListener("keyup", updateBillValue);

function updateBillValue() {
  bill = getInput(event);

  if (bill == 0 || bill === "") {
    billWarning.textContent = "Can't be zero";
    billInputField.classList.add("warning");
  } else {
    billWarning.textContent = "";
    billInputField.classList.remove("warning");
  }

  calculateMoney();
}

peopleInputField.addEventListener("click", getInput);

peopleInputField.addEventListener("focusout", updatePeopleNumber);
peopleInputField.addEventListener("keyup", updatePeopleNumber);

function updatePeopleNumber() {
  people = getInput(event);

  if (people == 0 || people === "") {
    peopleWarning.textContent = "Can't be zero";
    peopleInputField.classList.add("warning");
  } else {
    peopleWarning.textContent = "";
    peopleInputField.classList.remove("warning");
  }

  calculateMoney();
}

for (const tipAmountElement of tipAmountElements) {
  tipAmountElement.addEventListener("click", getClickedButtonValue);
  tipAmountElement.addEventListener("click", updateTipValue);
}

function updateTipValue() {
  tipPercent = getClickedButtonValue(event) / 100;
  calculateMoney();
}

tipAmountCustom.addEventListener("keyup", getInput);
tipAmountCustom.addEventListener("keyup", updateCustomTipValue);
tipAmountCustom.addEventListener("focus", deselectButtons);

function updateCustomTipValue() {
  tipPercent = getInput(event) / 100;
  calculateMoney();
}

resetButton.addEventListener("click", resetValues);

function resetValues() {
  billInputField.value = "";
  tipAmountCustom.value = "";
  peopleInputField.value = "";

  bill = 0;
  people = 0;
  tipPercent = 0;

  tipAmount = 0;
  totalAmount = 0;

  deselectButtons();

  updateInterface();
}

function calculateMoney() {
  tipAmount = (bill * tipPercent) / people;
  tipAmount = +tipAmount.toFixed(2);

  totalAmount = (bill / people) + tipAmount;
  totalAmount = +totalAmount.toFixed(2);

  updateInterface();
}

function updateInterface() {
  if (isNaN(tipAmount) || !isFinite(tipAmount)) {
    return;
  } else {
    tipAmountResult.textContent = "$" + tipAmount;
  }

  if (isNaN(totalAmount) || !isFinite(totalAmount)) {
    return;
  } else {
    totalAmountResult.textContent = "$" + totalAmount;
  }
}
