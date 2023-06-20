const TransactionForm = ({
  transactionType,
  chooseTransitionType,
  transactionFormSubmit,
  editMode,
  editTransaction,
  editTransactionData,
}) => {
  return (
    <form onSubmit={transactionFormSubmit}>
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
          value={editTransaction.name}
          onChange={editTransactionData}
          required
        />
      </div>
      <div>
        <label htmlFor="transactionAmount">Сума:</label>
        <input
          type="number"
          id="transactionAmount"
          name="amount"
          value={editTransaction.amount}
          onChange={editTransactionData}
          required
        />
      </div>
      <button type="submit">{editMode ? "Зберегти" : "Додати"}</button>
    </form>
  );
};

export default TransactionForm;
