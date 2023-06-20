import React, { useState, useEffect } from "react";

const TransactionForm = ({
  transactionType,
  chooseTransitionType,
  transactionFormSubmit,
  editMode,
  editTransaction,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editMode) {
      setName(editTransaction.name);
      setAmount(editTransaction.amount);
    } else {
      setName("");
      setAmount("");
    }
  }, [editMode, editTransaction]);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    transactionFormSubmit(e, name, parseFloat(amount));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editMode ? "Редагувати транзакцію" : "Додати транзакцію"}</h3>
      <div>
        <label>
          <input
            type="radio"
            value="дохід"
            checked={transactionType === "дохід"}
            onChange={chooseTransitionType}
          />
          Дохід
        </label>
        <label>
          <input
            type="radio"
            value="витрати"
            checked={transactionType === "витрати"}
            onChange={chooseTransitionType}
          />
          Витрата
        </label>
      </div>
      <div>
        <label htmlFor="transactionName">Назва:</label>
        <input
          type="text"
          id="transactionName"
          name="name"
          value={name}
          onChange={changeName}
          required
        />
      </div>
      <div>
        <label htmlFor="transactionAmount">Сума:</label>
        <input
          type="number"
          id="transactionAmount"
          name="amount"
          value={amount}
          onChange={changeAmount}
          required
        />
      </div>
      <button type="submit">{editMode ? "Зберегти" : "Додати"}</button>
    </form>
  );
};

export default TransactionForm;
