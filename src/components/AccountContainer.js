import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch("https://bank-of-flatiron-rbl9.onrender.com/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((error) => console.log("Error fetching transactions:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
    if (filtered.length === 0) {
      alert("Transaction not found");
    }
  };

  const addTransaction = (newTransaction) => {
    // Update the transactions state with the newly added transaction
    setTransactions([...transactions, newTransaction]);
    // Update the filteredTransactions state with the newly added transaction
    setFilteredTransactions([...filteredTransactions, newTransaction]);
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm onAddTransaction={addTransaction} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
