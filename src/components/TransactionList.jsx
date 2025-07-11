import React, { useState } from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      category: transaction.category
    });
  };

  const handleSaveEdit = (id) => {
    onEdit(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-text">No transactions found. Add your first transaction to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">Recent Transactions</h2>
      
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            isEditing={editingId === transaction.id}
            editForm={editForm}
            onEdit={handleEdit}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            onDelete={onDelete}
            onEditChange={handleEditChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList; 