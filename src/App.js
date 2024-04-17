import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoginPage from './components/LoginPage';
import QuestionForm from './components/QuestionForm';
import QueueView from './components/QueueView';
import React, { useState, useEffect } from 'react';


function App() {
  const [currentPage, setCurrentPage] = useState();


  const [expanded, setExpanded] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setExpanded(false);
  };
  //Removed button functionality for CCLC Queue in nav bar
  const handle_CCLC_button = (event) => {
    event.preventDefault();
  };

  const renderPage = (currentPage) => {
    switch (currentPage) {
      case 'home':
        localStorage.setItem('page','home');
        return <QuestionForm />;
      case 'login':
        localStorage.setItem('page','login');   //set page value in local storage to help with refresh
        return <LoginPage />;
      case 'queue':
        localStorage.setItem('page','queue');
        return <QueueView />;
      default:
        return;
    }
  };

  //load correct page on refresh hook
  useEffect(
    () => {
      if(localStorage.getItem('page') == null){
        handleNavClick('home');
      } else {
        handleNavClick(localStorage.getItem('page'));
      }
    },
    []
  );

  return (

    <div className="App"> 
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
        <Container>

          <Navbar.Brand onClick={() => handleNavClick('home')}> <img src="favicon.ico" alt="MTU Logo"  width={40} height={50} /> </Navbar.Brand>
          <Navbar.Brand href="#home" onClick={() => handleNavClick('home')} className="m-eauto">CCLC Queue</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-eauto">
              <Nav.Link href="#home" onClick={() => handleNavClick('home')}>Home</Nav.Link>
              <Nav.Link href="https://www.mtu.edu/computing/cclc/" target="_blank">Schedule</Nav.Link>
              <Nav.Link href="https://cslc.mtu.edu/" target="_blank">Our Website</Nav.Link>
              <Nav.Link href="#login" onClick={() => handleNavClick('login')}>Coach Login</Nav.Link>
              <Nav.Link href="#queue" onClick={() => handleNavClick('queue')}>Queue</Nav.Link>
              {/* add more links here */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {renderPage(currentPage)}
    </div>

    
  );
}

export default App;
