import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoginPage from './components/LoginPage';
import QuestionForm from './components/QuestionForm';
import QueueView from './components/QueueView';
import React, { useState } from 'react';


function App() {
  const [currentPage, setCurrentPage] = useState('home');


  const [expanded, setExpanded] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setExpanded(false);
  };

  const renderPage = (currentPage) => {
    switch (currentPage) {
      case 'home':
        return <QuestionForm />;
      case 'login':
        return <LoginPage />;
      case 'queue':
        return <QueueView />;
      default:
        return (
          <header className="App-header">
            <h1>Welcome to the CCLC!</h1>
            <Button variant="warning">Submit a question</Button>
          </header>
        );
    }
  };

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
