import React from 'react';

function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <div className="transaction-list">
      <h2>Your Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>
                <button onClick={() => onEdit(transaction.id)}>Edit</button>
                <button onClick={() => onDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
