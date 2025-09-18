import React, { useState, useEffect } from "react";
import API from "../api";

function Nominee() {
  const [nominees, setNominees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNominee, setNewNominee] = useState({
    user_ID: "",
    Nominee_name: "",
    relationship: "",
    nominee_user_ID: "",
    address: "",
    phone_no: "",
  });

  // Fetch all nominees
  const fetchNominees = async () => {
    try {
      const res = await API.get("/nominees");
      setNominees(res.data);
    } catch (error) {
      console.error("Error fetching nominees", error);
    }
  };

  // Add a new nominee
  const addNominee = async () => {
    try {
      await API.post("/nominees", newNominee);
      fetchNominees(); // Refresh data
      setNewNominee({ user_ID: "", Nominee_name: "", relationship: "", nominee_user_ID: "", address: "", phone_no: "" });
    } catch (error) {
      console.error("Error adding nominee", error);
    }
  };

  // Delete a nominee
  const deleteNominee = async (id) => {
    try {
      await API.delete(`/nominees/${id}`);
      fetchNominees(); // Refresh data
    } catch (error) {
      console.error("Error deleting nominee", error);
    }
  };

  useEffect(() => {
    fetchNominees();
  }, []);

  const filteredNominees = nominees.filter((nominee) =>
    nominee.user_ID && nominee.user_ID.toString().includes(searchTerm)
  );

  return (
    <div className="container">
      <h1>Nominees</h1>
      <h2>Search by User ID</h2>

      <div className="form-group mb-3">
    
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          placeholder="Search by User ID"
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Nominee Name</th>
            <th>Relationship</th>
            <th>Nominee User ID</th>
            <th>Address</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNominees.map((nominee) => (
            <tr key={nominee.nominee_user_ID}>
              <td>{nominee.user_ID}</td>
              <td>{nominee.Nominee_name}</td>
              <td>{nominee.relationship}</td>
              <td>{nominee.nominee_user_ID}</td>
              <td>{nominee.address}</td>
              <td>{nominee.phone_no}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteNominee(nominee.nominee_user_ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Nominee</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNominee();
        }}
      >
        <div className="form-group">
          <label>User ID</label>
          <input
            type="number"
            value={newNominee.user_ID}
            onChange={(e) => setNewNominee({ ...newNominee, user_ID: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Nominee Name</label>
          <input
            type="text"
            value={newNominee.Nominee_name}
            onChange={(e) => setNewNominee({ ...newNominee, Nominee_name: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Relationship</label>
          <input
            type="text"
            value={newNominee.relationship}
            onChange={(e) => setNewNominee({ ...newNominee, relationship: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Nominee User ID</label>
          <input
            type="number"
            value={newNominee.nominee_user_ID}
            onChange={(e) => setNewNominee({ ...newNominee, nominee_user_ID: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={newNominee.address}
            onChange={(e) => setNewNominee({ ...newNominee, address: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone No</label>
          <input
            type="text"
            value={newNominee.phone_no}
            onChange={(e) => setNewNominee({ ...newNominee, phone_no: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Nominee
        </button>
      </form>
    </div>
  );
}

export default Nominee;
