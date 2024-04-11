import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Airtable from 'airtable';
import './QuestionForm.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


var base = new Airtable({apiKey:'pataHBiNAHkqRtjq9.8c3789c03d409b5ae01156d584301599ecd3308377132fb4f965a1336cddacb6'}).base('apptCHdO2VgXDv2wL');


const QuestionForm = () => {
    const [formData, setFormData] = useState({
        questionText: '',
        questionType: '',
        relevantCourse: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { questionText, questionType, relevantCourse } = formData;

        if (!questionText.trim() || !questionType || !relevantCourse) {
            alert("Please enter a value for every field.");
            return;
        }
        base('CCLCQueue').create([
            {
                fields: {
                    QuestionText: questionText,
                    QuestionType: questionType,
                    Course: relevantCourse
                }
            }
        ], function(err) {
            if (err) {
                console.error(err);
                alert('Error submitting question' + err.message);
                return;
            }
            alert('Question submitted successfully!');
        });

        setFormData({
            questionText: '',
            questionType: '',
            relevantCourse: ''
        }); // Clear the form inputs after submission
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Welcome to the CCLC!</h1>
                <label htmlFor="questionText">Enter Question</label>
                <input
                    type="text"
                    name="questionText"
                    id="questionText"
                    placeholder="Enter Question"
                    value={formData.questionText}
                    onChange={handleChange}
                />
                <label htmlFor="questionType">Type of Question</label>
                <select
                    name="questionType"
                    id="questionType"
                    value={formData.questionType}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        Select Question type
                    </option>
                    <option value="Programming">Programming</option>
                    <option value="Theory">Theory</option>
                </select>
                <label htmlFor="relevantCourse">Relevant Course</label>
                <select
                    name="relevantCourse"
                    id="relevantCourse"
                    value={formData.relevantCourse}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        Select Relevant Course Number
                    </option>
                    <option value="CS1111">CS1111 (Introduction to Programming in C/C++)</option>
                    <option value="CS1121">CS1121 (Introduction to Programming I)</option>
                    <option value="CS1122">CS1122 (Introduction to Programming II)</option>
                    <option value="CS1131">CS1131 (Accelerated Introduction to Programming)</option>
                    <option value="DATA1201">DATA1201 (Data Science Programming I)</option>
                    <option value="DATA1202">DATA1202 (Data Science Programming II)</option>
                    <option value="CS1142">CS1142 (Programming at the HW/SW Interface)</option>
                    <option value="CS2311">CS2311 (Discrete Structures)</option>
                    <option value="CS2321">CS2321 (Data Structures)</option>
                    <option value="Other">Other</option>
                </select>
                <Button variant="warning" type='submit'>Submit your question</Button>
            </form>
        </div>
    );

};

export default QuestionForm;