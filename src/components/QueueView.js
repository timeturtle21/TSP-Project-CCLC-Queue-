import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const loggedIn = true;

const question1 = "???|Programming|CS 1111";
const question2 = "???|Theory|CS 1131";
const question3 = "Test| Question|Programming|CS 1234";
const question4 = "Test |Question|2|Theory|CS 1111";
const questions = [ question1, question2, question3, question4 ]

let deleteList = [];

let tableData = questions.map((question) =>
    (
        processQuestion(question)
    )
);

function processQuestion(question) {
    if (question == null)
        return;

    if (question.split("|").length > 3)
        {
            
            let questionText = "";
            for (let i = 0; i < question.split("|").length - 3; i++){
                questionText += question.split("|")[i];
                questionText += "|";
            }
            questionText += question.split("|")[question.split("|").length - 3];

            if (loggedIn === true)
            {
                return (
                    <tr>
                        <td>{questionText}</td>
                        <td>{question.split("|")[question.split("|").length - 2]}</td>
                        <td>{question.split("|")[question.split("|").length - 1]}</td>
                        {
                            <Form.Check.Input
                            type={"checkbox"}
                            defaultChecked={false}
                            onClick={(e) => {
                              handleChange(e, question);
                            }}
                          />
                        }
                    </tr>
                )
            }
            else
            {
                return (
                    <tr>
                        <td>{questionText}</td>
                        <td>{question.split("|")[question.split("|").length - 2]}</td>
                        <td>{question.split("|")[question.split("|").length - 1]}</td>
                    </tr>
                )
            }
        }
        else
        {
            if (loggedIn === true)
            {
                return (
                    <tr>
                        <td>{question.split("|")[0]}</td>
                        <td>{question.split("|")[1]}</td>
                        <td>{question.split("|")[2]}</td>
                        {
                            <Form.Check.Input
                            type={"checkbox"}
                            defaultChecked={false}
                            onClick={(e) => {
                              handleChange(e, question);
                            }}
                          />
                        }
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
}

const handleChange = (event, question) =>
{
    if (event.target.checked)
        addToList(question);
    else
       removeFromList(question); 
}
const addToList = (question) =>
{
    const index = questions.indexOf(question);

    deleteList.forEach(i => {
        if (i === index)
            return;
    });

    deleteList = [...deleteList, index];
}
const removeFromList = (question) =>
{
    const index = questions.indexOf(question);

    deleteList = [
        ...deleteList.slice(0, index), // Elements before the one to delete
        ...deleteList.slice(index + 1) // Elements after the one to delete
      ];
}

const deleteConfirmed = () =>
{
    deleteList.forEach(i => {
        questions[i] = null;    //Temporary solution
    });

    //update();
}

/*
function update()
{
    const [updating, setUpdate] = useState(false);
    setUpdate(true);
    setUpdate(false);
}
*/

const QueueView = () => {
    if (loggedIn === true)
    {
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
    
                    <Button variant="warning" onClick={deleteConfirmed}>Confirm Selected</Button>
                               
                </header>
            </div>
        );
    }
    else
    {
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
                               
                </header>
            </div>
        );
    }
};

export default QueueView;