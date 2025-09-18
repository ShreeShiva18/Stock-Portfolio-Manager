import React, { useState, useEffect } from "react";
import API from "../api";

function Stock() {
  const [stocks, setStocks] = useState([]); // Original list of all stocks
  const [filteredStocks, setFilteredStocks] = useState([]); // List of stocks filtered by Portfolio ID
  const [searchPortfolioId, setSearchPortfolioId] = useState(""); // Portfolio ID search state

  const [newStock, setNewStock] = useState({
    portfolio_id: "",
    stock: "",
    stock_id: "",
    current_market_price: "",
    invested_amount: "",
    current_value: "",
    no_of_shares: "",
    returns: "",
  });

  // Fetch all stocks
  const fetchStocks = async () => {
    try {
      const res = await API.get("/stocks");
      const fetchedStocks = res.data; // Save the original stock data
      setStocks(fetchedStocks); // Set the original data
      setFilteredStocks(fetchedStocks); // Set the filtered data initially to the full list
    } catch (error) {
      console.error("Error fetching stocks", error);
    }
  };

  // Add a new stock
  const addStock = async () => {
    try {
      await API.post("/stocks", newStock);
      fetchStocks(); // Refresh data after adding
      setNewStock({
        portfolio_id: "",
        stock: "",
        stock_id: "",
        current_market_price: "",
        invested_amount: "",
        current_value: "",
        no_of_shares: "",
        returns: "",
      });
    } catch (error) {
      console.error("Error adding stock", error);
    }
  };

  // Delete a stock
  const deleteStock = async (id) => {
    try {
      await API.delete(`/stocks/${id}`);
      fetchStocks(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting stock", error);
    }
  };

  // Handle search change (filter based on portfolio ID)
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchPortfolioId(value);

    if (value.trim() === "") {
      // Reset filtered data when search is cleared
      setFilteredStocks(stocks);
    } else {
      // Filter stocks based on portfolio_id
      const filtered = stocks.filter(
        (stock) => stock.portfolio_id.toString() === value.trim()
      );
      setFilteredStocks(filtered);
    }
  };

  useEffect(() => {
    fetchStocks(); // Fetch data once on component mount
  }, []);

  return (
    <div className="container">
      <h1>Stocks</h1>
      <h2>Search by Portfolio ID</h2>

      {/* Search Bar */}
      <div className="form-group mb-3">
      
        <input
          type="text"
          id="searchPortfolioId"
          value={searchPortfolioId}
          onChange={handleSearch} // Handle change for search bar
          className="form-control"
          placeholder="Enter Portfolio ID"
        />
      </div>

      {/* Stocks Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Portfolio ID</th>
            <th>Stock</th>
            <th>Stock ID</th>
            <th>Current Market Price</th>
            <th>Invested Amount</th>
            <th>Current Value</th>
            <th>No. of Shares</th>
            <th>Returns</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No Stocks Found
              </td>
            </tr>
          ) : (
            filteredStocks.map((stock) => (
              <tr key={`${stock.portfolio_id}-${stock.stock_id}`}>
                <td>{stock.portfolio_id}</td>
                <td>{stock.stock}</td>
                <td>{stock.stock_id}</td>
                <td>{stock.current_market_price}</td>
                <td>{stock.invested_amount}</td>
                <td>{stock.current_value}</td>
                <td>{stock.no_of_shares}</td>
                <td>{stock.returns}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteStock(stock.stock_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Add New Stock</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addStock();
        }}
      >
        <div className="form-group">
          <label>Portfolio ID</label>
          <input
            type="number"
            value={newStock.portfolio_id}
            onChange={(e) =>
              setNewStock({ ...newStock, portfolio_id: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            type="text"
            value={newStock.stock}
            onChange={(e) =>
              setNewStock({ ...newStock, stock: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Stock ID</label>
          <input
            type="text"
            value={newStock.stock_id}
            onChange={(e) =>
              setNewStock({ ...newStock, stock_id: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Current Market Price</label>
          <input
            type="number"
            value={newStock.current_market_price}
            onChange={(e) =>
              setNewStock({ ...newStock, current_market_price: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Invested Amount</label>
          <input
            type="number"
            value={newStock.invested_amount}
            onChange={(e) =>
              setNewStock({ ...newStock, invested_amount: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Current Value</label>
          <input
            type="number"
            value={newStock.current_value}
            onChange={(e) =>
              setNewStock({ ...newStock, current_value: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>No. of Shares</label>
          <input
            type="number"
            value={newStock.no_of_shares}
            onChange={(e) =>
              setNewStock({ ...newStock, no_of_shares: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Returns</label>
          <input
            type="text"
            value={newStock.returns}
            onChange={(e) =>
              setNewStock({ ...newStock, returns: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Stock
        </button>
      </form>
    </div>
  );
}

export default Stock;









