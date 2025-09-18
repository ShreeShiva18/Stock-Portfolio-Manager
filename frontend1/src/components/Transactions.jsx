import React, { useState, useEffect } from "react";
import API from "../api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [newTransaction, setNewTransaction] = useState({
    portfolio_id: "",
    stock_id: "",
    buying_price: "",
    selling_price: "",
    quantity: "",
    amount: "",
    DATE: "",
    account_no: "",
    UTR: "",
  });

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  // Add a new transaction
  const addTransaction = async () => {
    try {
      await API.post("/transactions", newTransaction);
      fetchTransactions(); // Refresh data
      setNewTransaction({
        portfolio_id: "",
        stock_id: "",
        buying_price: "",
        selling_price: "",
        quantity: "",
        amount: "",
        DATE: "",
        account_no: "",
        UTR: "",
      });
    } catch (error) {
      console.error("Error adding transaction", error);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions(); // Refresh data
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter transactions by search query
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.portfolio_id.toString().includes(searchQuery)
  );

  return (
    <div className="container">
      <h1>Transactions</h1>
      <h2>Search by Portfolio ID</h2>

      {/* Search bar */}
      <div className="form-group mb-4">
      
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
          placeholder="Enter portfolio ID"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Portfolio ID</th>
            <th>Stock ID</th>
            <th>Buying Price</th>
            <th>Selling Price</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Account No</th>
            <th>UTR</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.UTR}>
              <td>{transaction.portfolio_id}</td>
              <td>{transaction.stock_id}</td>
              <td>{transaction.buying_price}</td>
              <td>{transaction.selling_price}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.DATE}</td>
              <td>{transaction.account_no}</td>
              <td>{transaction.UTR}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTransaction(transaction.UTR)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Transaction</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTransaction();
        }}
      >
        <div className="form-group">
          <label>Portfolio ID</label>
          <input
            type="number"
            value={newTransaction.portfolio_id}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, portfolio_id: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Stock ID</label>
          <input
            type="text"
            value={newTransaction.stock_id}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, stock_id: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Buying Price</label>
          <input
            type="number"
            value={newTransaction.buying_price}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, buying_price: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Selling Price</label>
          <input
            type="number"
            value={newTransaction.selling_price}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, selling_price: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={newTransaction.quantity}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, quantity: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, amount: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={newTransaction.DATE}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, DATE: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Account No</label>
          <input
            type="text"
            value={newTransaction.account_no}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, account_no: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>UTR</label>
          <input
            type="text"
            value={newTransaction.UTR}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, UTR: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default Transactions;

