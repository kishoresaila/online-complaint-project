import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { Button, Card, Alert } from 'react-bootstrap';
import ChatWindow from '../common/ChatWindow';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusCompliants, setStatusCompliants] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios.get(`https://resolvenow-backend-pbye.onrender.com/status/${user._id}`)
        .then((res) => setStatusCompliants(res.data))
        .catch((err) => alert("Failed to fetch status"));
    }
  }, []);

  const toggleCollapse = (id) => {
    setToggle({ ...toggle, [id]: !toggle[id] });
  };

  return (
    <div style={{
      backgroundColor: '#fffde7',
      padding: '20px',
      fontFamily: 'Calibri, sans-serif',
      minHeight: '80vh'
    }}>
      <h3 style={{ color: '#f57f17' }}>Your Complaint Status</h3>
      {statusCompliants.map((complaint, index) => (
        <Card key={index} style={{ marginBottom: '10px' }}>
          <Card.Header>
            <strong>{complaint.name}</strong>
            <Button
              variant="link"
              onClick={() => toggleCollapse(complaint._id)}
              style={{ float: 'right' }}
            >
              {toggle[complaint._id] ? 'Hide' : 'Show'}
            </Button>
          </Card.Header>
          <Collapse in={toggle[complaint._id]}>
            <div>
              <Card.Body>
                <p><strong>Status:</strong> {complaint.status}</p>
                <p><strong>Comment:</strong> {complaint.comment}</p>
                <ChatWindow id={complaint._id} />
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      ))}
      {statusCompliants.length === 0 && (
        <Alert variant="info">No complaints found.</Alert>
      )}
    </div>
  );
};

export default Status;
