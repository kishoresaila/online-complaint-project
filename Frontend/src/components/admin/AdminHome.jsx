import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userName, setUserName] = useState('');
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name || 'Admin');
    } else {
      navigate('/');
    }
  }, [navigate]);
  useEffect(() => {
    axios.get("https://resolvenow-backend-pbye.onrender.com/AllComplaints")
      .then(res => setComplaints(res.data))
      .catch(err => {
        console.error("Error fetching complaints:", err);
        alert("Failed to fetch complaints");
      });
  }, []);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ fontFamily: 'Cursive', backgroundColor: '#f1f8e9', minHeight: '100vh' }}>
      <Navbar bg="success" variant="dark" expand="lg" style={{ padding: '10px 20px' }}>
        <Container fluid>
          <Navbar.Brand style={{ fontSize: '1.4em' }}>Hi Admin, {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <NavLink
                className={`nav-link me-3 ${activeComponent === '   Dashboard' ? 'active text-warning' : 'text-light' }`}
                onClick={() => handleNavLinkClick('dashboard')}
              >
                Dashboard
              </NavLink>
              <NavLink
                className={`nav-link me-3 ${activeComponent === '   UserInfo' ? 'active text-warning' : 'text-light'}`}
                onClick={() => handleNavLinkClick('UserInfo')}
              >
                Users
              </NavLink>
              <NavLink
                className={`nav-link me-3 ${activeComponent === '   Agent ' ? 'active text-warning' : 'text-light'}`}
                onClick={() => handleNavLinkClick('Agent')}
              >
                Agents
              </NavLink>
            </Nav>
            <Button onClick={LogOut} variant="outline-light">Log out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
      <h2>All Complaints</h2>
      {complaints.map(c => (
        <div key={c._id}>
          <p><strong>Name:</strong> {c.name}</p>
          <p><strong>Status:</strong> {c.status}</p>
          <hr />
        </div>
      ))}
    </div>

      <div style={{ padding: '30px' }}>
        {activeComponent === 'dashboard' && <AccordionAdmin />}
        {activeComponent === 'UserInfo' && <UserInfo />}
        {activeComponent === 'Agent' && <AgentInfo />}
      </div>
    </div>
  );
};

export default AdminHome;

