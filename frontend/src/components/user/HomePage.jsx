import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import Complaint from './Complaint';
import Status from './Status';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Complaint');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name || 'User');
    } else {
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <div style={{
      backgroundColor: '#f3e5f5',
      fontFamily: 'Tahoma, sans-serif',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <h2 style={{ color: '#6a1b9a', textAlign: 'center' }}>Welcome, {userName}!</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button onClick={() => setActiveComponent('Complaint')}>Complaint</button>
        <button onClick={() => setActiveComponent('Status')}>Status</button>
      </div>
      <div style={{ marginTop: '30px' }}>
        {activeComponent === 'Complaint' ? <Complaint /> : <Status />}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;





