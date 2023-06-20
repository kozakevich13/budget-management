import React from "react";
import { List, Button } from "antd";

const TransactionList = ({
  transactions,
  updateTransition,
  deleteTransaction,
}) => {
  const renderItem = (transaction, index) => {
    return (
      <div className="list-item">
        <List.Item
          key={index}
          actions={[
            <Button onClick={() => updateTransition(index)}>Редагувати</Button>,
            <Button
              onClick={() => deleteTransaction(index)}
              danger // Додано тип "danger"
            >
              Видалити
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={`${transaction.name}: ${transaction.amount} (${transaction.type})`}
            description={new Date(transaction.createdAt).toLocaleString()}
          />
        </List.Item>
      </div>
    );
  };

  return (
    <div>
      <h3>Транзакція:</h3>
      <List dataSource={transactions} renderItem={renderItem} />
    </div>
  );
};

export default TransactionList;
