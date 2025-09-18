import React, { useState, useEffect } from "react";
import API from "../api";

function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPortfolio, setNewPortfolio] = useState({
    user_ID: "",
    Demat_acc_no: "",
    current_holdings: "",
    total_investment: "",
    total_returns: "",
    PnL_in_percentage: "",
  });

  // Fetch all portfolios
  const fetchPortfolios = async () => {
    try {
      const res = await API.get("/portfolios");
      setPortfolios(res.data);
    } catch (error) {
      console.error("Error fetching portfolios", error);
    }
  };

  // Add a new portfolio
  const addPortfolio = async () => {
    try {
      await API.post("/portfolios", newPortfolio);
      fetchPortfolios(); // Refresh data
      setNewPortfolio({ user_ID: "", Demat_acc_no: "", current_holdings: "", total_investment: "", total_returns: "", PnL_in_percentage: "" });
    } catch (error) {
      console.error("Error adding portfolio", error);
    }
  };

  // Delete a portfolio
  const deletePortfolio = async (id) => {
    try {
      await API.delete(`/portfolios/${id}`);
      fetchPortfolios(); // Refresh data
    } catch (error) {
      console.error("Error deleting portfolio", error);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const filteredPortfolios = portfolios.filter((portfolio) =>
    portfolio.portfolio_id && portfolio.portfolio_id.toString().includes(searchTerm)
  );

  return (
    <div className="container">
      <h1>Portfolios</h1>
      <h2>Search by Portfolio ID</h2>

      <div className="form-group mb-3">
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          placeholder="Search by portfolio ID"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Portfolio ID</th>
            <th>Demat Account No</th>
            <th>Current Holdings</th>
            <th>Total Investment</th>
            <th>Total Returns</th>
            <th>PnL (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPortfolios.map((portfolio) => (
            <tr key={portfolio.user_ID}>
              <td>{portfolio.user_ID}</td>
              <td>{portfolio.portfolio_id}</td>
              <td>{portfolio.Demat_acc_no}</td>
              <td>{portfolio.current_holdings}</td>
              <td>{portfolio.total_investment}</td>
              <td>{portfolio.total_returns}</td>
              <td>{portfolio.PnL_in_percentage}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deletePortfolio(portfolio.user_ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Portfolio</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPortfolio();
        }}
      >
        <div className="form-group">
          <label>User ID</label>
          <input
            type="number"
            value={newPortfolio.user_ID}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, user_ID: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Demat Account No</label>
          <input
            type="text"
            value={newPortfolio.Demat_acc_no}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, Demat_acc_no: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Current Holdings</label>
          <input
            type="number"
            value={newPortfolio.current_holdings}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, current_holdings: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Total Investment</label>
          <input
            type="number"
            value={newPortfolio.total_investment}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, total_investment: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Total Returns</label>
          <input
            type="number"
            value={newPortfolio.total_returns}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, total_returns: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>PnL (%)</label>
          <input
            type="text"
            value={newPortfolio.PnL_in_percentage}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, PnL_in_percentage: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Portfolio
        </button>
      </form>
    </div>
  );
}

export default Portfolio;
