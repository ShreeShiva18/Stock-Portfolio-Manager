import React, { useState, useEffect } from "react";
import API from "../api";

function Investor() {
  const [investors, setInvestors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [newInvestor, setNewInvestor] = useState({
    Name: "",
    Demat_acc_no: "",
    DOB: "",
    Phone_no: "",
    address: "",
    gender: "male",
  });

  // Fetch all investors
  const fetchInvestors = async () => {
    try {
      const res = await API.get("/investors");
      setInvestors(res.data);
      setFilteredInvestors(res.data); // Initialize filtered investors
    } catch (error) {
      console.error("Error fetching investors", error);
    }
  };

  // Add a new investor
  const addInvestor = async () => {
    try {
      await API.post("/investors", newInvestor);
      fetchInvestors(); // Refresh data
      setNewInvestor({ Name: "", Demat_acc_no: "", DOB: "", Phone_no: "", address: "", gender: "male" });
    } catch (error) {
      console.error("Error adding investor", error);
    }
  };

  // Delete an investor
  const deleteInvestor = async (id) => {
    try {
      await API.delete(`/investors/${id}`);
      fetchInvestors(); // Refresh data
    } catch (error) {
      console.error("Error deleting investor", error);
    }
  };

  // Handle search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredInvestors(investors);
    } else {
      const filtered = investors.filter((investor) =>
        investor.Name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredInvestors(filtered);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  return (
    <div className="container">
      <h1>Investors</h1>
      <h2>Search investor</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="form-control mb-3"
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>USER ID</th>
            <th>Demat Account No</th>
            <th>DOB</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvestors.map((investor) => (
            <tr key={investor.user_ID}>
              <td>{investor.Name}</td>
              <td>{investor.user_ID}</td>
              <td>{investor.Demat_acc_no}</td>
              <td>{new Date(investor.DOB).toLocaleDateString()}</td>
              <td>{investor.Phone_no}</td>
              <td>{investor.address}</td>
              <td>{investor.gender}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteInvestor(investor.user_ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Investor</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addInvestor();
        }}
      >
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={newInvestor.Name}
            onChange={(e) => setNewInvestor({ ...newInvestor, Name: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Demat Account No</label>
          <input
            type="text"
            value={newInvestor.Demat_acc_no}
            onChange={(e) => setNewInvestor({ ...newInvestor, Demat_acc_no: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>DOB</label>
          <input
            type="date"
            value={newInvestor.DOB}
            onChange={(e) => setNewInvestor({ ...newInvestor, DOB: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone No</label>
          <input
            type="text"
            value={newInvestor.Phone_no}
            onChange={(e) => setNewInvestor({ ...newInvestor, Phone_no: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={newInvestor.address}
            onChange={(e) => setNewInvestor({ ...newInvestor, address: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            value={newInvestor.gender}
            onChange={(e) => setNewInvestor({ ...newInvestor, gender: e.target.value })}
            className="form-control"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Investor
        </button>
      </form>
    </div>
  );
}

export default Investor;