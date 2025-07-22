import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate(); // ✅ init

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'User'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("https://resolvenow-backend-pbye.onrender.com/SignUp", data);
      alert('User Registered Successfully');
      navigate('/Login'); // ✅ redirect
    } catch (err) {
      console.error("Signup Error (frontend):", err.response?.data || err.message);
      if (err.response?.status === 409) {
         alert('User already exists.');
      } else if (err.response?.data?.message) {
         alert('Registration failed: ' + err.response.data.message);
      } else {
         alert('Registration failed. Please check fields and try again.');
      }
   }

  };
  return (
    <div style={{
      backgroundColor: '#fff3e0',
      padding: '30px',
      fontFamily: 'Georgia, serif',
      textAlign: 'left',
      minHeight: '100vh'
    }}>
      <h2 style={{ color: '#e65100', marginBottom: '20px' }}>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        /><br />

        <label>Email:</label><br />
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        /><br />

        <label>Password:</label><br />
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        /><br />

        <label>Phone:</label><br />
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        /><br />

        <label>Role:</label><br />
        <select
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          style={{ margin: '10px 0', padding: '10px', width: '250px' }}
        >
          <option>User</option>
          <option>Admin</option>
          <option>Agent</option>
        </select><br /><br />

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#fb8c00',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1em'
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
