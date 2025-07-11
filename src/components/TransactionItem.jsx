import React from 'react';

const TransactionItem = ({ 
  transaction, 
  isEditing, 
  editForm, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete, 
  onEditChange 
}) => {
  const categories = [
    'Groceries',
    'Fuel',
    'Entertainment',
    'Dining',
    'Rent/Mortgage',
    'Utilities',
    'Insurance',
    'Savings/Investments',
    'Healthcare',
    'Shopping',
    'Travel',
    'Education',
    'Subscriptions',
    'Miscellaneous'
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Groceries': 'category-green',
      'Fuel': 'category-blue',
      'Entertainment': 'category-purple',
      'Dining': 'category-orange',
      'Rent/Mortgage': 'category-red',
      'Utilities': 'category-yellow',
      'Insurance': 'category-indigo',
      'Savings/Investments': 'category-emerald',
      'Healthcare': 'category-pink',
      'Shopping': 'category-rose',
      'Travel': 'category-cyan',
      'Education': 'category-violet',
      'Subscriptions': 'category-slate',
      'Miscellaneous': 'category-gray'
    };
    return colors[category] || 'category-gray';
  };

  if (isEditing) {
    return (
      <div className="transaction-item editing">
        <div className="edit-grid">
          <input
            type="text"
            name="name"
            value={editForm.name}
            onChange={onEditChange}
            className="input-field"
            placeholder="Transaction name"
          />
          <input
            type="number"
            name="amount"
            value={editForm.amount}
            onChange={onEditChange}
            className="input-field"
            placeholder="Amount"
          />
          <input
            type="date"
            name="date"
            value={editForm.date}
            onChange={onEditChange}
            className="input-field"
          />
          <select
            name="category"
            value={editForm.category}
            onChange={onEditChange}
            className="input-field"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-actions">
          <button
            onClick={() => onSave(transaction.id)}
            className="btn-primary"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-item">
      <div className="transaction-content">
        <div className="transaction-grid">
          <div className="transaction-name">
            <h3>{transaction.name}</h3>
          </div>
          <div className="transaction-amount">
            <span>₹{transaction.amount.toLocaleString()}</span>
          </div>
          <div className="transaction-date">
            <span>{new Date(transaction.date).toLocaleDateString()}</span>
          </div>
          <div className="transaction-category">
            <span className={`category-badge ${getCategoryColor(transaction.category)}`}>
              {transaction.category}
            </span>
          </div>
        </div>
        
        <div className="transaction-actions">
          <button
            onClick={() => onEdit(transaction)}
            className="action-btn edit-btn"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="action-btn delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem; 