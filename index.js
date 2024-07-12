
document.getElementById('expense-form').addEventListener('submit', addExpense);
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
function addExpense(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    if (description && amount && category && date) {
        const expense = { description, amount, category, date }; 
        expenses.push(expense); 
        localStorage.setItem('expenses', JSON.stringify(expenses)); 
        displayExpenses(); 
        updateTotal();
        document.getElementById('expense-form').reset(); 
    }
}

function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit" onclick="editExpense(${index})">Edit</button>
                <button class="delete" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    });
}


function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('description').value = expense.description;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('category').value = expense.category;
    document.getElementById('date').value = expense.date;
    // deleteExpense(index);
}


function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses(); 
}
function updateTotal(){
    const total = expenses.reduce((sum,expense)=>sum + expense.amount,0)
    document.getElementById('total').textContent= `Total:${total.toFixed(2)}`
}
displayExpenses();
updateTotal();