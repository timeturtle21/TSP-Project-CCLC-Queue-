import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoginPage from './components/LoginPage';
import QuestionForm from './components/QuestionForm';
import React, { useState } from 'react';


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const renderPage = (currentPage) => {
    switch (currentPage) {
      case 'home':
        return <QuestionForm />;
      case 'login':
        return <LoginPage />;
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
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" onClick={() => handleNavClick('home')}>CCLC Queue</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={() => handleNavClick('home')}>Home</Nav.Link>
            <Nav.Link href="https://www.mtu.edu/computing/cclc/" target="_blank">Schedule</Nav.Link>
            <Nav.Link href="https://cslc.mtu.edu/" target="_blank">Our Website</Nav.Link>
            <Nav.Link href="#login" onClick={() => handleNavClick('login')}>Coach Login</Nav.Link>
            <Nav.Link href="#queue">Queue</Nav.Link>
            {/* add more links here */}
          </Nav>
        </Container>
      </Navbar>
      {renderPage(currentPage)}
    </div>

    
  );
}

export default App;
