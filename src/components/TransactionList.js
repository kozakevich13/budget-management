import React from "react";

const TransactionList = ({
  transactions,
  updateTransition,
  deleteTransaction,
}) => {
  return (
    <div>
      <h3>Транзакція:</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.name}: {transaction.amount} ({transaction.type}) -{" "}
            {new Date(transaction.createdAt).toLocaleString()}
            <button onClick={() => updateTransition(index)}>Редагувати</button>
            <button onClick={() => deleteTransaction(index)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
