// AccountContainer.js
import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setFilteredTransactions(data))
      .catch((error) => console.log("Error fetching transactions:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.filter((transaction) =>
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTransactions(filtered);
      })
      .catch((error) => console.log("Error fetching transactions:", error));
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
