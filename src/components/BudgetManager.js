import React, { useState } from "react";
import TransactionForm from "./TransactionForm";

const BudgetManager = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [showFrom, setShowFrom] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTransaction, setEditTransaction] = useState({
    name: "",
    amount: "",
  });

  const chooseTransitionType = (e) => {
    setTransactionType(e.target.value);
  };

  const transactionFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const amount = parseFloat(e.target.elements.amount.value);
    const newTransaction = { name, amount, type: transactionType };

    if (editMode) {
      const updatedTransactions = [...transactions];
      const oldTransaction = updatedTransactions[editIndex];
      updatedTransactions[editIndex] = newTransaction;

      if (oldTransaction.type === "дохід") {
        setIncome(income - oldTransaction.amount + amount);
      } else if (oldTransaction.type === "витрати") {
        setExpenses(expenses - oldTransaction.amount + amount);
      }

      setTransactions(updatedTransactions);
      setEditMode(false);
      setEditIndex(null);
      setEditTransaction({ name: "", amount: "" });
    } else {
      setTransactions([...transactions, newTransaction]);

      if (transactionType === "дохід") {
        setIncome(income + amount);
      } else if (transactionType === "витрати") {
        setExpenses(expenses + amount);
      }
    }

    setShowFrom(false);
    setTransactionType("");
  };

  const updateTransition = (index) => {
    const transaction = transactions[index];
    setTransactionType(transaction.type);
    setEditMode(true);
    setEditIndex(index);
    setShowFrom(true);
    setEditTransaction({
      name: transaction.name,
      amount: transaction.amount,
    });
  };

  const deleteTransaction = (index) => {
    const transaction = transactions[index];
    const updatedTransactions = [...transactions];

    if (transaction.type === "дохід") {
      setIncome(income - transaction.amount);
    } else if (transaction.type === "витрати") {
      setExpenses(expenses - transaction.amount);
    }

    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const editTransactionData = (e) => {
    const { name, value } = e.target;
    setEditTransaction((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <h2>Управління бюджетом</h2>
      <div>
        <button onClick={() => setShowFrom(true)}>Транзакції</button>
      </div>

      {showFrom && (
        <TransactionForm
          transactionType={transactionType}
          chooseTransitionType={chooseTransitionType}
          transactionFormSubmit={transactionFormSubmit}
          editMode={editMode}
          editTransaction={editTransaction}
          editTransactionData={editTransactionData}
        />
      )}

      <div>
        <h3>Транзакція:</h3>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.name}: {transaction.amount} ({transaction.type})
              <button onClick={() => updateTransition(index)}>
                Редагувати
              </button>
              <button onClick={() => deleteTransaction(index)}>Видалити</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Баланс:</strong> {income - expenses}
      </div>
    </div>
  );
};

export default BudgetManager;
