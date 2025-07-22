import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Footer from '../common/FooterC';
import axios from 'axios';
// ❌ Removed this line (self-import):
// import AgentInfo from "./components/admin/AgentInfo";

const AgentInfo = () => {
  const navigate = useNavigate();
  const [ordinaryList, setOrdinaryList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateAgent, setUpdateAgent] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUpdateAgent({ ...updateAgent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (user_id) => {
    if (!updateAgent.name && !updateAgent.email && !updateAgent.phone) {
      alert("Please fill at least one field.");
      return;
    }
    if (window.confirm("Are you sure you want to update the agent?")) {
      try {
        await axios.put(`http://localhost:5002/user/${user_id}`, updateAgent);
        alert("Agent updated successfully.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const getAgents = async () => {
      try {
        const response = await axios.get('https://resolvenow-backend-pbye.onrender.com/agentUsers');
        setOrdinaryList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAgents();
  }, [navigate]);
  useEffect(() => {
  const fetchAgents = async () => {
    try {
      const res = await axios.get("https://resolvenow-backend-pbye.onrender.com/agentUsers");
      setOrdinaryList(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
      alert("Failed to fetch agents");
    }
  };

  fetchAgents();
}, []);

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete the agent?")) {
      try {
        await axios.delete(`https://resolvenow-backend-pbye.onrender.com/OrdinaryUsers/${userId}`);
        setOrdinaryList(ordinaryList.filter(agent => agent._id !== userId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  

  const handleToggle = (userId) => {
    setToggle((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <>
      <div style={{
        backgroundColor: '#fff8e1',
        fontFamily: 'Calibri, sans-serif',
        padding: '30px',
        minHeight: '100vh'
      }}>
        <h3 style={{ textAlign: 'center', color: '#ef6c00' }}>Agent Information</h3>

        <Container>
          <Table striped bordered hover>
            <thead style={{ backgroundColor: '#ffe082' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ordinaryList.length > 0 ? (
                ordinaryList.map((agent) => {
                  const open = toggle[agent._id] || false;

                  return (
                    <tr key={agent._id}>
                      <td>{agent.name}</td>
                      <td>{agent.email}</td>
                      <td>{agent.phone}</td>
                      <td>
                        <Button
                          onClick={() => handleToggle(agent._id)}
                          aria-controls={`collapse-${agent._id}`}
                          aria-expanded={open}
                          className="mx-2"
                          variant="outline-warning"
                        >
                          Update
                        </Button>

                        <Collapse in={open}>
                          <div id={`collapse-${agent._id}`} style={{ backgroundColor: '#fffde7', padding: '20px', marginTop: '10px' }}>
                            <Form onSubmit={(e) => {
                              e.preventDefault();
                              handleSubmit(agent._id);
                            }}>
                              <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  name="name"
                                  value={updateAgent.name}
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="Enter name"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                  name="email"
                                  value={updateAgent.email}
                                  onChange={handleChange}
                                  type="email"
                                  placeholder="Enter email"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  name="phone"
                                  value={updateAgent.phone}
                                  onChange={handleChange}
                                  type="tel"
                                  placeholder="Enter phone number"
                                />
                              </Form.Group>
                              <Button size="sm" variant="outline-success" type="submit">Submit</Button>
                            </Form>
                          </div>
                        </Collapse>

                        <Button onClick={() => deleteUser(agent._id)} className="mx-2" variant="outline-danger">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">
                    <Alert variant="info" className="text-center">
                      <Alert.Heading>No agents to display</Alert.Heading>
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AgentInfo;

