import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Table from 'react-bootstrap/Table';
import './QuestionForm.css';

const question1 = {
    Question: "???",
    Type: "Programming",
    Class: "CS 1111"
}
const question2 = {
    Question: "???",
    Type: "Theory",
    Class: "CS 1131"
}
const questions = [ question1, question2 ]

let tableData = questions.map((question) =>
    (
        <tr>
            <td>{question.Question}</td>
            <td>{question.Type}</td>
            <td>{question.Class}</td>
        </tr>
    )
);


const QueueView = () => {
    return(
        <div>
            <header className="App-header">
                <h1>Current Questions</h1>
                
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Type</th>
                            <th>Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </Table>

                <Button variant="warning">Confirm Selected</Button>
                           
            </header>
        </div>
    );
};

export default QueueView;