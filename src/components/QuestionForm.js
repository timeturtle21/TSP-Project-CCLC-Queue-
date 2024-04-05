import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './QuestionForm.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const QuestionForm = () => {
    return(
        <Row>
            <Col>
                <header className="App-header">
                    <h1>Welcome to the CCLC!</h1>
                    <label for="question">Enter Question</label>
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
            </Col>
        </Row>
    );  
};

export default QuestionForm;