import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Table from 'react-bootstrap/Table';

const question1 = "???|Programming|CS 1111";
const question2 = "???|Theory|CS 1131";
const question3 = "Test| Question|Programming|CS1234";
const questions = [ question1, question2, question3 ]

let tableData = questions.map((question) =>
    (
        processQuestion(question)
    )
);

function processQuestion(question) {
    if (question.split("|").length > 3)
        {
            let questionText = "";
            for (let i = 0; i < question.split("|").length - 3; i++){
                questionText += question.split("|")[i];
                questionText += "|";
            }
            questionText += question.split("|")[question.split("|").length - 3];

            return (
            <tr>
                <td>{questionText}</td>
                <td>{question.split("|")[question.split.length - 2]}</td>
                <td>{question.split("|")[question.split.length - 1]}</td>
            </tr>
            )
        }
        else
        {
            return (
            <tr>
                <td>{question.split("|")[0]}</td>
                <td>{question.split("|")[1]}</td>
                <td>{question.split("|")[2]}</td>
            </tr>
            )
        }
}


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