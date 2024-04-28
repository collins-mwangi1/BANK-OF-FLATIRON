// AddTransactionForm.js
import React, { useState } from "react";

function AddTransactionForm() {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://bank-of-flatiron-rbl9.onrender.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log("Transaction added:", data))
      .catch((error) => console.log("Error adding transaction:", error));
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
