// TransactionsList.js
import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("https://bank-of-flatiron-rbl9.onrender.com/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  const handleDelete = (id) => {
    // Filter out the transaction with the given id
    const updatedTransactions = transactions.filter((trans) => trans.id !== id);
    setTransactions(updatedTransactions);
    // Display an alert
    alert("Are you sure you want to delete the transaction");
  };

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Actions</h3>
          </th>
        </tr>
        {transactions &&
          transactions.map((trans) => (
            <tr key={trans.id}>
              <td>
                <p>{trans.date}</p>
              </td>
              <td>
                <p>{trans.description}</p>
              </td>
              <td>
                <p>{trans.category}</p>
              </td>
              <td>
                <p>${trans.amount}</p>
              </td>
              <td>
                <button onClick={() => handleDelete(trans.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
