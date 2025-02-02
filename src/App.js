import React, { useState, useEffect } from 'react';
import './App.css';
import Budget from './components/Budget';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';

function App() {
  const loadDataFromLocalStorage = () => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    const storedRemainingBudget = localStorage.getItem('remainingBudget');

    return {
      transactions: storedTransactions || [
        { id: 1, name: 'Groceries', amount: 500, date: '2025-02-03', category: 'Groceries' },
        { id: 2, name: 'Fuel', amount: 1000, date: '2025-02-04', category: 'Fuel' },
      ],
      remainingBudget: storedRemainingBudget ? parseInt(storedRemainingBudget) : 5000,
    };
  };

  const [totalBudget] = useState(5000);
  const [remainingBudget, setRemainingBudget] = useState(loadDataFromLocalStorage().remainingBudget);
  const [transactions, setTransactions] = useState(loadDataFromLocalStorage().transactions);
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: 0,
    date: '',
    category: ''
  });

  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });
  };

  const calculateTotalSpent = (transactions) => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const getBudgetingTips = () => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

    const tips = [];

    const tipsCategories = {
      'Groceries': 1000,
      'Fuel': 1500,
      'Rent/Mortgage': 5000,
      'Utilities': 2000,
      'Insurance': 1500,
      'Savings/Investments': 1000,
      'Healthcare': 1000,
      'Shopping': 2000,
      'Travel': 3000,
      'Education': 1000,
      'Subscriptions': 1000
    };

    Object.entries(tipsCategories).forEach(([category, limit]) => {
      if (categoryTotals[category] && categoryTotals[category] > limit) {
        tips.push(`You are spending a lot on ${category}. Consider reducing your expenses.`);
      }
    });

    return tips;
  };

  const handleAddTransaction = () => {
    if (!newTransaction.name || !newTransaction.amount || !newTransaction.date || !newTransaction.category) {
      alert('Please fill out all fields');
      return;
    }

    const updatedTransactions = [
      ...transactions,
      {
        id: transactions.length + 1,
        name: newTransaction.name,
        amount: parseInt(newTransaction.amount),
        date: newTransaction.date,
        category: newTransaction.category,
      },
    ];

    const totalSpent = calculateTotalSpent(updatedTransactions);
    const updatedRemainingBudget = totalBudget - totalSpent;

    setTransactions(updatedTransactions);
    setRemainingBudget(updatedRemainingBudget);

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    localStorage.setItem('remainingBudget', updatedRemainingBudget.toString());

    setNewTransaction({ name: '', amount: 0, date: '', category: '' });
  };

  const handleEditTransaction = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    setEditingTransaction(transactionToEdit);
    setNewTransaction({
      name: transactionToEdit.name,
      amount: transactionToEdit.amount,
      date: transactionToEdit.date,
      category: transactionToEdit.category,
    });
  };

  const handleSaveTransaction = () => {
    if (!newTransaction.name || !newTransaction.amount || !newTransaction.date || !newTransaction.category) {
      alert('Please fill out all fields');
      return;
    }

    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === editingTransaction.id) {
        const newAmount = parseInt(newTransaction.amount);
        return { ...transaction, name: newTransaction.name, amount: newAmount, date: newTransaction.date, category: newTransaction.category };
      }
      return transaction;
    });

    const totalSpent = calculateTotalSpent(updatedTransactions);
    const updatedRemainingBudget = totalBudget - totalSpent;

    setTransactions(updatedTransactions);
    setRemainingBudget(updatedRemainingBudget);

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    localStorage.setItem('remainingBudget', updatedRemainingBudget.toString());

    setEditingTransaction(null);
    setNewTransaction({ name: '', amount: 0, date: '', category: '' });
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    const totalSpent = calculateTotalSpent(updatedTransactions);
    const updatedRemainingBudget = totalBudget - totalSpent;

    setTransactions(updatedTransactions);
    setRemainingBudget(updatedRemainingBudget);

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    localStorage.setItem('remainingBudget', updatedRemainingBudget.toString());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Finance Tracker</h1>

        {/* Budget Display */}
        <Budget totalBudget={totalBudget} remainingBudget={remainingBudget} />

        {/* Display Budgeting Tips */}
        <div className="budgeting-tips">
          <h3>Budgeting Tips:</h3>
          <ul>
            {getBudgetingTips().map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Transaction List */}
        <TransactionList 
          transactions={transactions} 
          onDelete={handleDeleteTransaction} 
          onEdit={handleEditTransaction}  
        />

        {/* Transaction Input Form */}
        <div className="transaction-form">
          <h2>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
          <input
            type="text"
            name="name"
            placeholder="Transaction Name"
            value={newTransaction.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
          />
          <select 
            name="category" 
            value={newTransaction.category} 
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Fuel">Fuel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Dining">Dining</option>
            <option value="Rent/Mortgage">Rent/Mortgage</option>
            <option value="Utilities">Utilities</option>
            <option value="Insurance">Insurance</option>
            <option value="Savings/Investments">Savings/Investments</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <button onClick={editingTransaction ? handleSaveTransaction : handleAddTransaction}>
            {editingTransaction ? 'Save Transaction' : 'Add Transaction'}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
