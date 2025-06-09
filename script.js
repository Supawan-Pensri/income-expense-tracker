const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

function init() {
    list.innerHTML = '';
    transactions.forEach(addDataToList);
    calculeteMoney();
}

function addDataToList(transaction) {
    const symbol = transaction.amount < 0 ? '-' : '+';
    const status = transaction.amount < 0 ? 'minus' : 'puls';
    const item = document.createElement('li');
    const result = numberWithCommas(Math.abs(transaction.amount));
    item.classList.add(status);
    item.innerHTML = `${transaction.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transaction.id})">x</button>`;
    list.appendChild(item);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function autoID() {
    return Math.floor(Math.random() * 1000000);
}

function calculeteMoney() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((result, item) => (result += item), 0).toFixed(2);
    const expense = amounts.filter(item => item < 0).reduce((result, item) => (result += item), 0).toFixed(2);

    balance.innerText = `฿` + numberWithCommas(total);
    money_plus.innerText = `฿` + numberWithCommas(income);
    money_minus.innerText = `฿` + numberWithCommas(expense);
}

function removeData(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init(); // รีเฟรชข้อมูลใหม่
}

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('กรุณาป้อนข้อมูลให้ครบ');
    } else {
        const data = {
            id: autoID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(data);
        addDataToList(data);
        calculeteMoney();
        text.value = '';
        amount.value = '';
    }
}

form.addEventListener('submit', addTransaction);

init();
