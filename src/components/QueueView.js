import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Airtable from 'airtable';
import './QueueView.css';
import { useState, useEffect } from 'react';
import useLogin from '../hooks/useLogin.js'

//reads from database
var base = new Airtable({apiKey:'patgVxgZqPS3SgUow.0d397c1968ab9a7b7e3d80aa10f5263497029732e59a134c89110d54240d1b6b'}).base('appiBfiFO2XY0tDPc');
function QueueView() {
    const [questions, setQuestions] = useState([]);
    const [loggedIn] = useLogin();

    useEffect(() => {
        base('CCLCQueue').select({
            view: 'Grid view'
        }).firstPage((error, records) => {
            if (error) { 
                alert("An error occured: " + error); 
                return; 
            }
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
            base('CCLCQueue').destroy(id, (error, record) => {
                if (error) {
                    alert("An error occured: " + error);
                    return; 
                }
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
                        {loggedIn ? 
                        <th></th>
                        : null}
                    </tr>
                    {questions.map(({ id, questionText, type, className, isSelected }) => (
                            <tr key={id}>
                                <td>{questionText}</td>
                                <td>{type}</td>
                                <td>{className}</td>
                                {loggedIn ?
                                <td>
                                    <input type="checkbox" checked={isSelected} onChange={() => handleCheckboxChange(id)}/>
                                </td>
                                : null}
                            </tr>
                        ))}
                </table>
            </div>
            {loggedIn ?
            <div className="delete-container">
                <button onClick={handleDelete}>Delete</button>
            </div>
            : null}
        </div>
    );
}

export default QueueView;