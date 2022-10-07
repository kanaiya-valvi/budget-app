"use strict";

// ? Define variables
// ** Clear button
const clearbtn = document.querySelector("#clearbtn");
clearbtn.addEventListener("click", (e) => {
  if (movements.length == 0) {
    alert("No Data Found");
  } else if (confirm("Do you really want to delete all elements")) {
    movements = [];
    disMov();
    totalBalance.textContent = `₹ 0.00`;
    income.textContent = `₹ 0.00 ↑`;
    expense.textContent = `₹ 0.00 ↓`;
  }
});

// ** Balance Details

const totalBalance = document.querySelector(".balance__amount");
const income = document.querySelector(".income");
const expense = document.querySelector(".expense");

// ** Input fields

const select = document.querySelector(".select");
const discriptione = document.querySelector("#discriptione");
const amountValue = document.querySelector("#amount-value");
const submitButton = document.querySelector("#submit");

// ** Table
const incomeList = document.querySelector(".income-list");
const outcomList = document.querySelector(".outcom-list");

// Todo Events
let sumamount = [];
let movements = [];
let incomemov = [];
let expensemov = [];

const sumof = function () {
  sumamount = [];
  movements.forEach((values, key) => {
    if (values.get("select") == "expense") {
      sumamount.push(-values.get("amount"));
    } else {
      sumamount.push(Number(values.get("amount")));
    }
  });
  if (sumamount.length != 0) {
    let totale = sumamount.reduce((sum, value) => +sum + value);
    totalBalance.textContent = `₹ ${totale}`;
  } else {
    totalBalance.textContent = `₹ 0.00`;
  }
};
const inco = function () {
  incomemov = [];
  expensemov = [];
  movements.forEach((values, key) => {
    if (values.get("select") == "expense") {
      expensemov.push(-values.get("amount"));
    } else {
      incomemov.push(Number(values.get("amount")));
    }
  });
  let pers, a, b;
  if (incomemov.length !== 0) {
    a = incomemov.reduce((sum, val) => sum + val);
    income.textContent = `₹ ${a} ↑`;
  } else {
    income.textContent = `₹ 0.00 ↑`;
  }
  if (expensemov.length !== 0) {
    b = expensemov.reduce((sum, val) => sum + val);
    expense.textContent = `₹ ${b} ↓`;
  } else {
    expense.textContent = `₹ 0.00 ↓`;
  }
  let sum = a + b;
  pers = sum / a;
  pers *= 100;
  if (pers >= 0) {
    expense.textContent = `(%${Math.trunc(100 - pers)})${b} ↓`;
  }
};

const addMov = function () {
  let transition = new Map();
  transition.set("select", select.value);
  transition.set("discription", discriptione.value);
  transition.set("amount", amountValue.value);
  movements.push(transition);
};
const disMov = function () {
  incomeList.innerHTML = "";
  outcomList.innerHTML = "";

  movements.forEach((values, key) => {
    let type = values.get("select") == "expense" ? "exp" : "inc";
    let moves = `<tr>
    <td '>${values.get("discription")}</td>
    <td class='${type}'>${values.get("amount")}</td>
    <td><button class="del" onclick="delEl(this)" value="${key}">Delete</button></td>
    </tr>`;
    if (values.get("select") == "expense") {
      outcomList.insertAdjacentHTML("afterbegin", moves);
    } else {
      incomeList.insertAdjacentHTML("afterbegin", moves);
    }
  });
  sumof(); //function call sum
  inco(); //function call income ex

  // ! Return Value
  // select.value = "selected";
  discriptione.value = "";
  amountValue.value = "";
};
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    discriptione.value !== "" &&
    amountValue.value !== "" &&
    amountValue.value !== 0
  ) {
    addMov();
    disMov();
  } else {
    alert("Please fill all the fields");
  }
});

function delEl(e) {
  if (confirm("Do you really want to delete the element")) {
    movements.forEach((value, key) => {
      if (e.value == key) {
        movements.splice(key, 1);
        disMov();
      }
    });
  }
}
