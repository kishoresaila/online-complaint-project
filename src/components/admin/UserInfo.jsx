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

const UserInfo = () => {
  const navigate = useNavigate();
  const [ordinaryList, setOrdinaryList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [userList, setUserList] = useState([]);
  const [updateUser, setUpdateUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (user_id) => {
    if (!updateUser.name && !updateUser.email && !updateUser.phone) {
      alert("Please fill at least one field.");
      return;
    }
    if (window.confirm("Are you sure you want to update the user?")) {
      try {
        await axios.put(`https://resolvenow-backend-pbye.onrender.com/user/${user_id}`, updateUser);
        alert("User updated successfully.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        axios.get("https://resolvenow-backend-pbye.onrender.com/AllComplaints")
        const response = await axios.get('https://resolvenow-backend-pbye.onrender.com/OrdinaryUsers');
        setOrdinaryList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [navigate]);
  useEffect(() => {
    axios.get("https://resolvenow-backend-pbye.onrender.com/ordinaryUsers")
      .then((res) => setUserList(res.data))
      .catch((err) => {
        console.error("Error fetching users:", err);
        alert("Failed to fetch users");
      });
  }, []);

  const deleteUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete the user?");
    if (confirmed) {
      try {
        await axios.delete(`https://resolvenow-backend-pbye.onrender.com/OrdinaryUsers/${userId}`);
        setOrdinaryList(ordinaryList.filter(user => user._id !== userId));
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
        backgroundColor: '#e8f5e9',
        fontFamily: 'Verdana, sans-serif',
        padding: '30px',
        minHeight: '100vh'
      }}>
        <h3 style={{ textAlign: 'center', color: '#2e7d32' }}>User Information</h3>

        <Container>
          <Table striped bordered hover>
            <thead style={{ backgroundColor: '#a5d6a7' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ordinaryList.length > 0 ? (
                ordinaryList.map((user) => {
                  const open = toggle[user._id] || false;

                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button
                          onClick={() => handleToggle(user._id)}
                          aria-controls={`collapse-${user._id}`}
                          aria-expanded={open}
                          className="mx-2"
                          variant="outline-warning"
                        >
                          Update
                        </Button>

                        <Collapse in={open}>
                          <div id={`collapse-${user._id}`} style={{ backgroundColor: '#f1f8e9', padding: '20px', marginTop: '10px' }}>
                            <Form onSubmit={(e) => {
                              e.preventDefault();
                              handleSubmit(user._id);
                            }}>
                              <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  name="name"
                                  value={updateUser.name}
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="Enter name"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                  name="email"
                                  value={updateUser.email}
                                  onChange={handleChange}
                                  type="email"
                                  placeholder="Enter email"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  name="phone"
                                  value={updateUser.phone}
                                  onChange={handleChange}
                                  type="tel"
                                  placeholder="Enter phone number"
                                />
                              </Form.Group>
                              <Button size="sm" variant="outline-success" type="submit">Submit</Button>
                            </Form>
                          </div>
                        </Collapse>
                        {userList.map((user) => (
  <div key={user._id}>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <hr />
  </div>
))}


                        <Button onClick={() => deleteUser(user._id)} className="mx-2" variant="outline-danger">
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
                      <Alert.Heading>No users to display</Alert.Heading>
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

export default UserInfo;
