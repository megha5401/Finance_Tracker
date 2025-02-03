<<<<<<< HEAD
import React from 'react';

function TransactionForm({ newTransaction, handleInputChange, handleAddTransaction, handleSaveTransaction, editingTransaction }) {
  return (
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
  );
}

export default TransactionForm;
=======
import React from 'react';

function TransactionForm({ newTransaction, handleInputChange, handleAddTransaction, handleSaveTransaction, editingTransaction }) {
  return (
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
  );
}

export default TransactionForm;
>>>>>>> 57f81fe8120fb207422d8efecef0bc43655bf735
