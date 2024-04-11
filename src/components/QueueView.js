import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const QueueView = () => {
    const [questions, setQuestions] = useState([]);
    const [deleteList, setDeleteList] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        setLoggedIn(false);
        const getQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/get-csv-data');
                setQuestions(csvStringToArray(response.data));
            } catch(error) {
                console.error('Error fetching CSV data:', error);
            }
        };
        
        getQuestions();
    }, []);

    

    const csvStringToArray = (csvString) => {
        if (!csvString || typeof csvString !== 'string') {
            console.error('Invalid CSV string.');
            return [];
        }
        
        // Split the CSV string into an array of rows
        const rows = csvString.trim().split('\n');
        // Exclude the first row (headers) from the result
        const dataRows = rows.slice(1);
        const result = [];

        for (let i = 0; i < dataRows.length; i++) {
            // Split the row into an array of values, handling quoted fields
            const values = dataRows[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g); //fixes shitty inputs
            // Remove quotation marks from each value
            const cleanValues = values.map(value => value.replace(/^"|"$/g, ''));
            result.push(cleanValues);
        }
        
        return result;
    };

    const handleChange = (event, index) => {
        if (event.target.checked) {
            setDeleteList([...deleteList, index]);
        } else {
            setDeleteList(deleteList.filter(i => i !== index));
        }
    };

    const deleteConfirmed = () => {
    };

    return (
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
                        {questions.map((row, index) => (
                            <tr key={index}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                                {loggedIn && (
                                    <td>
                                        <input type="checkbox" onChange={(e) => handleChange(e, index)} />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Button variant="warning" onClick={deleteConfirmed}>Confirm Selected</Button>
                               
            </header>
        </div>
    );
};

export default QueueView;