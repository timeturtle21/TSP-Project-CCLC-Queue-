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
const questionQueue = [];
base('CCLCQueue').select({
    view: 'Grid view'
}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function(record) {
        const questionText = record.get('QuestionText');
        const questionType = record.get('QuestionType');
        const course = record.get('Course');
        const question = questionText + '|' + questionType + '|' + course;
        questionQueue.push(question);
    });
});

function QueueView() {
    const parseData = (question) => {
        const parts = question.split('|');
        return { question: parts[0], type: parts[1], className: parts[2] };
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
                        {questionQueue.map((item) => {
                        const { question, type, className } = parseData(item);
                        return (
                            <tr>
                                <td>{question}</td>
                                <td>{type}</td>
                                <td>{className}</td>
                                <td>
                                    <input type="checkbox"/>
                                </td>
                            </tr>
                        );
                        })}
                </table>
            </div>
            <div className="delete-container">
                <button>Delete</button>
            </div>
        </div>
    );
}

export default QueueView;