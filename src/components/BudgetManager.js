import React, { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const BudgetManager = () => {
  const [income, setIncome] = useState(() => {
    const storedIncome = localStorage.getItem("income");
    return storedIncome ? parseInt(storedIncome) : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? parseInt(storedExpenses) : 0;
  });
  const [showFrom, setShowFrom] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("transactions");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTransaction, setEditTransaction] = useState({
    name: "",
    amount: "",
  });

  useEffect(() => {
    localStorage.setItem("income", income.toString());
    localStorage.setItem("expenses", expenses.toString());
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [income, expenses, transactions]);

  const chooseTransitionType = (e) => {
    setTransactionType(e.target.value);
  };

  const transactionFormSubmit = (e, name, amount) => {
    e.preventDefault();
    const newTransaction = {
      name,
      amount,
      type: transactionType,
      createdAt: Date.now(),
    };

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

      <TransactionList
        transactions={transactions}
        updateTransition={updateTransition}
        deleteTransaction={deleteTransaction}
      />

      <div>
        <strong>Баланс:</strong> {income - expenses}
      </div>
    </div>
  );
};

export default BudgetManager;
