import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function FooterC() {
  return (
    <MDBFooter
      bgColor="dark"
      className="text-center text-white"
      style={{
        padding: '20px 0',
        fontFamily: 'Segoe UI, sans-serif',
        fontSize: '14px',
        backgroundColor: '#263238'
      }}
    >
      <div>
        <p style={{ marginBottom: '5px' }}>
          <strong>ComplaintCare</strong> — Empowering Public Feedback
        </p>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </MDBFooter>
  );
}

