import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Airtable from 'airtable';
import './QueueView.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

//reads from database
var base = new Airtable({apiKey:'pataHBiNAHkqRtjq9.8c3789c03d409b5ae01156d584301599ecd3308377132fb4f965a1336cddacb6'}).base('apptCHdO2VgXDv2wL');
function QueueView() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        base('CCLCQueue').select({
            view: 'Grid view'
        }).firstPage((err, records) => {
            if (err) { console.error(err); return; }
            const questionList = records.map(record => ({
                id: record.id,
                questionText: record.get('QuestionText'),
                type: record.get('QuestionType'),
                className: record.get('Course'),
                isSelected: false
            }));
            setQuestions(questionList);
        });
    }, []);

    const handleCheckboxChange = (id) => {
        const updatedQuestions = questions.map(q => {
            if (q.id === id) {
                return {...q, isSelected: !q.isSelected};
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

    const handleDelete = () => {
        const idsToDelete = questions.filter(q => q.isSelected).map(q => q.id);
        idsToDelete.forEach(id => {
            base('CCLCQueue').destroy(id, (err, record) => {
                if (err) { console.error(err); return; }
            });
        });
        setQuestions(questions.filter(q => !q.isSelected));
    };

    return (
        <div className = "QueueView">
            <div className = "table-container">
                <table>
                    <tr>
                        <th>Questions</th>
                        <th>Type</th>
                        <th>Class</th>
                        <th></th>
                    </tr>
                    {questions.map(({ id, questionText, type, className, isSelected }) => (
                            <tr key={id}>
                                <td>{questionText}</td>
                                <td>{type}</td>
                                <td>{className}</td>
                                <td>
                                    <input type="checkbox" checked={isSelected} onChange={() => handleCheckboxChange(id)}/>
                                </td>
                            </tr>
                        ))}
                </table>
            </div>
            <div className="delete-container">
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default QueueView;