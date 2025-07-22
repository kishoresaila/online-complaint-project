import axios from 'axios';
import React, { useState } from 'react';

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userComplaint, setUserComplaint] = useState({
    userId: user._id,
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint({ ...userComplaint, [name]: value });
  };

  const handleClear = () => {
    setUserComplaint({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
    });
  };

  const handleSubmit = async () => {
  try {
    console.log("Submitting complaint:", userComplaint); // optional debug
    await axios.post("https://resolvenow-backend-pbye.onrender.com/Complaint", userComplaint);
    alert("Complaint submitted successfully!");
    handleClear();
  } catch (err) {
    console.error("❌ Complaint submission error:", err.response?.data || err.message);
    alert("Submission failed");
  }
};


  return (
    <div style={{
      backgroundColor: '#e3f2fd',
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif',
      borderRadius: '10px'
    }}>
      <h3 style={{ color: '#0d47a1' }}>Register Complaint</h3>
      <input type="text" name="name" placeholder="Name" value={userComplaint.name} onChange={handleChange} /><br />
      <input type="text" name="address" placeholder="Address" value={userComplaint.address} onChange={handleChange} /><br />
      <input type="text" name="city" placeholder="City" value={userComplaint.city} onChange={handleChange} /><br />
      <input type="text" name="state" placeholder="State" value={userComplaint.state} onChange={handleChange} /><br />
      <input type="text" name="pincode" placeholder="Pincode" value={userComplaint.pincode} onChange={handleChange} /><br />
      <input type="text" name="status" placeholder="Status" value={userComplaint.status} onChange={handleChange} /><br />
      <textarea name="comment" placeholder="Comment" value={userComplaint.comment} onChange={handleChange}></textarea><br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleClear} style={{ marginLeft: '10px' }}>Clear</button>
    </div>
  );
};

export default Complaint;

