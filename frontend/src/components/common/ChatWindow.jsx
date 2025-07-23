import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = (props) => {
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageWindowRef = useRef(null);

  // ✅ Fetch messages when complaintId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://resolvenow-backend-pbye.onrender.com/messages/${props.complaintId}`);
        setMessageList(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [props.complaintId]);

  // ✅ Scroll to bottom after new messages
  useEffect(() => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  }, [messageList]);

  // ✅ Send a message
  const sendMessage = async () => {
    try {
      const data = {
        name: props.name,
        message: messageInput,
        complaintId: props.complaintId,
      };
      await axios.post('https://resolvenow-backend-pbye.onrender.com', data);
      setMessageInput('');
      // Re-fetch messages
      const response = await axios.get(`https://resolvenow-backend-pbye.onrender.com/${props.complaintId}`);
      setMessageList(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f1f8e9',
      borderRadius: '10px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      marginTop: '20px'
    }}>
      <h4 style={{ color: '#33691e' }}>Message Box</h4>

      <div
        ref={messageWindowRef}
        style={{
          backgroundColor: '#e8f5e9',
          border: '1px solid #aed581',
          borderRadius: '8px',
          padding: '10px',
          height: '200px',
          overflowY: 'auto',
          marginBottom: '15px'
        }}
      >
        {messageList.slice().reverse().map((msg) => (
          <div key={msg._id} style={{ marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid #c5e1a5' }}>
            <p style={{ margin: 0 }}><strong>{msg.name}:</strong> {msg.message}</p>
            <p style={{ fontSize: '10px', color: '#757575', margin: 0 }}>
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(msg.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          required
          type="text"
          placeholder="Type your message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #c8e6c9',
            borderRadius: '5px'
          }}
        />
        <button
          onClick={sendMessage}
          className="btn btn-success"
          style={{ padding: '8px 15px' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

