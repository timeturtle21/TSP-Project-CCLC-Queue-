import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoginPage from './components/LoginPage';
import React, { useState } from 'react';


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const renderPage = (currentPage) => {
    switch (currentPage) {
      case 'home':
        return (
          <header className="App-header">
            <h1>Welcome to the CCLC!</h1>
            <label for="firstname">Enter Question</label> 
                    <input 
                        type="text"
                        name="questionText"
                        id="questionText"
                        placeholder="Enter Question"
                        
                        />
            <label>Type of Question</label> 
                    <select name="select" id="select"> 
                        <option value="" disabled selected> 
                            Select Question type 
                        </option> 
                            <option value="1">Programming</option> 
                            <option value="2">Theory</option> 
                    </select>
            <label>Relevant Course</label> 
                    <select name="select" id="select"> 
                        <option value="" disabled selected> 
                            Select Relevant Course Number 
                        </option> 
                            <option value="1">CS 1111 (Introduction to Programming in C/C++)</option> 
                            <option value="2">CS 1121 (Introduction to Programming I)</option> 
                            <option value="3">CS 1122 (Introduction to Programming II)</option> 
                            <option value="4">CS 1131 (Accelerated Introduction to Programming)</option> 
                            <option value="5">CS 1142 (Programming at the HW/SW Interface)</option> 
                            <option value="6">CS 2311 (Discrete Structures)</option> 
                            <option value="7">CS 2321 (Data Structures)</option> 
                            <option value="3">Other</option> 

                    </select>                       
            <Button variant="warning">Submit your question</Button>
          </header>
        );
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
