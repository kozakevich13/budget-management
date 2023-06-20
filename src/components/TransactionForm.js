import React, { useState, useEffect } from "react";
import { Input, Radio, Button } from "antd";

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
        <Radio.Group value={transactionType} onChange={chooseTransitionType}>
          <Radio value="дохід">Дохід</Radio>
          <Radio value="витрати">Витрата</Radio>
        </Radio.Group>
      </div>
      <div className="form-input">
        <label htmlFor="transactionName">Назва:</label>
        <Input
          type="text"
          id="transactionName"
          name="name"
          value={name}
          onChange={changeName}
          required
        />
      </div>
      <div className="form-input">
        <label htmlFor="transactionAmount">Сума:</label>
        <Input
          type="number"
          id="transactionAmount"
          name="amount"
          value={amount}
          onChange={changeAmount}
          required
        />
      </div>
      <Button htmlType="submit">{editMode ? "Зберегти" : "Додати"}</Button>
    </form>
  );
};

export default TransactionForm;
