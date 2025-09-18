import React, { useState, useEffect } from "react";
import API from "../api";

function Bank() {
  const [banks, setBanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBank, setNewBank] = useState({
    user_ID: "",
    name: "",
    account_no: "",
    IFSC_Code: "",
    bank_branch: "",
  });

  // Fetch all bank details
  const fetchBanks = async () => {
    try {
      const res = await API.get("/banks");
      setBanks(res.data);
    } catch (error) {
      console.error("Error fetching banks", error);
    }
  };

  // Add a new bank
  const addBank = async () => {
    try {
      await API.post("/banks", newBank);
      fetchBanks(); // Refresh data
      setNewBank({ user_ID: "", name: "", account_no: "", IFSC_Code: "", bank_branch: "" });
    } catch (error) {
      console.error("Error adding bank", error);
    }
  };

  // Delete a bank
  const deleteBank = async (id) => {
    try {
      await API.delete(`/banks/${id}`);
      fetchBanks(); // Refresh data
    } catch (error) {
      console.error("Error deleting bank", error);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Bank Details</h1>
      <h2>Search by account holder's Name</h2>

      <div className="form-group mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          placeholder="Search by name"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Account No</th>
            <th>IFSC Code</th>
            <th>Bank Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBanks.map((bank) => (
            <tr key={bank.account_no}>
              <td>{bank.user_ID}</td>
              <td>{bank.name}</td>
              <td>{bank.account_no}</td>
              <td>{bank.IFSC_Code}</td>
              <td>{bank.bank_branch}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteBank(bank.account_no)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Bank</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBank();
        }}
      >
        <div className="form-group">
          <label>User ID</label>
          <input
            type="number"
            value={newBank.user_ID}
            onChange={(e) => setNewBank({ ...newBank, user_ID: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={newBank.name}
            onChange={(e) => setNewBank({ ...newBank, name: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Account No</label>
          <input
            type="text"
            value={newBank.account_no}
            onChange={(e) => setNewBank({ ...newBank, account_no: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>IFSC Code</label>
          <input
            type="text"
            value={newBank.IFSC_Code}
            onChange={(e) => setNewBank({ ...newBank, IFSC_Code: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Bank Branch</label>
          <input
            type="text"
            value={newBank.bank_branch}
            onChange={(e) => setNewBank({ ...newBank, bank_branch: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Bank
        </button>
      </form>
    </div>
  );
}

export default Bank;
