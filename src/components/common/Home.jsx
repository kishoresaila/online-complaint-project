import React from 'react';
import { Link } from 'react-router-dom';
import Image1 from '../../Images/Image1.png';
import Footer from './FooterC';
import { Navbar, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
   const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand>ComplaintCare </Navbar.Brand>
               <ul className="navbar-nav">
                  <li className="nav-item mb-2">
                     <Link to={'/'}
                        className={`nav-link text-light `}
                     >
                        Home
                     </Link>
                  </li>
                  
                  <li className="nav-item mb-2">
                     <Link
                     to={'/signup'}
                        className={`nav-link text-light `}
                     >
                        SignUp
                     </Link>
                  </li>
                  <li className="nav-item mb-2">
                     <Link
                     to={'/login'}
                        className={`nav-link text-light `}
                     >
                        Login
                     </Link>
                  </li>
               </ul>
            </Container>
         </Navbar>
      <div className="App">
        <div className="home-container">
          <div className="left-side">
            <img src={Image1} alt="Welcome" />
          </div>
          <div className="right-side">
            <h1>Welcome to ComplaintCare</h1>
            <p>Your platform to raise and resolve community issues quickly and easily.</p>
            <Link to="/Login">
              <button className="btn btn-primary mt-3" onClick={() => navigate("/Login")}>Get Started</button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

