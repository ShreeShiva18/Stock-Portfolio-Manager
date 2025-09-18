import React, { useState, useEffect } from "react";
import API from "../api";

function Company() {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [newCompany, setNewCompany] = useState({
    stock_id: "",
    Company_name: "",
    company_id: "",
    established_on: "",
    date_of_issue: "",
    issue_size_in_CR: "",
  });

  // Fetch all companies
  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (error) {
      console.error("Error fetching companies", error);
    }
  };

  // Add a new company
  const addCompany = async () => {
    try {
      await API.post("/companies", newCompany);
      fetchCompanies(); // Refresh data
      setNewCompany({
        stock_id: "",
        Company_name: "",
        company_id: "",
        established_on: "",
        date_of_issue: "",
        issue_size_in_CR: "",
      });
    } catch (error) {
      console.error("Error adding company", error);
    }
  };

  // Delete a company
  const deleteCompany = async (id) => {
    try {
      await API.delete(`/companies/${id}`);
      fetchCompanies(); // Refresh data
    } catch (error) {
      console.error("Error deleting company", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filter companies by search query
  const filteredCompanies = companies.filter((company) =>
    company.Company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Companies</h1>
      <h2>Search by Company Name</h2>

      {/* Search bar */}
      <div className="form-group mb-4">
      
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
          placeholder="Enter company name"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Stock ID</th>
            <th>Company Name</th>
            <th>Company ID</th>
            <th>Established On</th>
            <th>Date of Issue</th>
            <th>Issue Size (CR)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((company) => (
            <tr key={company.stock_id}>
              <td>{company.stock_id}</td>
              <td>{company.Company_name}</td>
              <td>{company.company_id}</td>
              <td>{new Date(company.established_on).toLocaleDateString()}</td>
              <td>{new Date(company.date_of_issue).toLocaleDateString()}</td>
              <td>{company.issue_size_in_CR}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteCompany(company.stock_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Company</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCompany();
        }}
      >
        <div className="form-group">
          <label>Stock ID</label>
          <input
            type="text"
            value={newCompany.stock_id}
            onChange={(e) => setNewCompany({ ...newCompany, stock_id: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={newCompany.Company_name}
            onChange={(e) => setNewCompany({ ...newCompany, Company_name: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Company ID</label>
          <input
            type="text"
            value={newCompany.company_id}
            onChange={(e) => setNewCompany({ ...newCompany, company_id: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Established On</label>
          <input
            type="date"
            value={newCompany.established_on}
            onChange={(e) => setNewCompany({ ...newCompany, established_on: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Issue</label>
          <input
            type="date"
            value={newCompany.date_of_issue}
            onChange={(e) => setNewCompany({ ...newCompany, date_of_issue: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Issue Size (CR)</label>
          <input
            type="number"
            value={newCompany.issue_size_in_CR}
            onChange={(e) => setNewCompany({ ...newCompany, issue_size_in_CR: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Company
        </button>
      </form>
    </div>
  );
}

export default Company;

