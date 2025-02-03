<<<<<<< HEAD
import React from 'react';

function TransactionItem({ transaction, onDelete, onEdit }) {
  return (
    <div className="transaction-item">
      <p>{transaction.name} - ₹{transaction.amount} on {transaction.date}</p>
      <button onClick={() => onDelete(transaction.id)}>Delete</button>
      <button onClick={() => onEdit(transaction.id)}>Edit</button>  {/* Edit button */}
    </div>
  );
}

export default TransactionItem;
=======
import React from 'react';

function TransactionItem({ transaction, onDelete, onEdit }) {
  return (
    <div className="transaction-item">
      <p>{transaction.name} - ₹{transaction.amount} on {transaction.date}</p>
      <button onClick={() => onDelete(transaction.id)}>Delete</button>
      <button onClick={() => onEdit(transaction.id)}>Edit</button>  {/* Edit button */}
    </div>
  );
}

export default TransactionItem;
>>>>>>> 57f81fe8120fb207422d8efecef0bc43655bf735
