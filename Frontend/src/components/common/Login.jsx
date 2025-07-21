import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    console.log("📤 Sending login request:", email, password);

    const response = await axios.post("https://resolvenow-backend-pbye.onrender.com/Login", {
      email,
      password,
    });

    console.log("✅ Login response:", response);

    const user = response.data.user || response.data;
    if (user && user.role) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("✅ Redirecting to:", user.role);

      if (user.role === "Admin") navigate("/AdminHome");
      else if (user.role === "User") navigate("/Homepage");
      else if (user.role === "Agent") navigate("/AgentHome");
    } else {
      alert("Login failed: user not found.");
    }
  } catch (err) {
    console.error("❌ Login error:", err.response?.data || err.message);
    alert("Login failed. Please check your credentials.");
  }
};



  return (
    <div style={{
      backgroundColor: '#e0f7fa',
      padding: '30px',
      fontFamily: 'Verdana, sans-serif',
      textAlign: 'center',
      minHeight: '100vh'
    }}>
      <h2 style={{ color: '#006064', marginBottom: '20px' }}>Login</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          margin: '10px',
          padding: '10px',
          width: '250px',
          fontSize: '1em'
        }}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          margin: '10px',
          padding: '10px',
          width: '250px',
          fontSize: '1em'
        }}
      /><br />

      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#00838f',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1em'
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;

