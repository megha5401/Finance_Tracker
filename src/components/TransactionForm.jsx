import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    category: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount || !formData.date || !formData.category) {
      alert('Please fill out all fields');
      return;
    }

    const transaction = {
      name: formData.name,
      amount: parseInt(formData.amount),
      date: formData.date,
      category: formData.category
    };

    onAddTransaction(transaction);
    
    // Reset form
    setFormData({
      name: '',
      amount: '',
      date: '',
      category: ''
    });
  };

  return (
    <div>
      <h2 className="section-title">Add New Transaction</h2>
      
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="input-label">
              Transaction Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Grocery shopping"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="input-label">
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input-field"
              placeholder="0"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="date" className="input-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="input-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="transaction-btn"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm; 