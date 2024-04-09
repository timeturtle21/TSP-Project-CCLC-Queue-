import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './QuestionForm.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

/*
since frontend and backend are in different places their might be CORS errors
(Cross-orign resource sharing)
must run npm install cors
     run mbom install axios
*/

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
        const newQuestion = { questionText, questionType, relevantCourse };
        alert('Question submitted successfully!');
        console.log('Submitted Question:', newQuestion);

        try {
            //TODO: change URL to match backend endpoint
            const response = await axios.post('http://localhost:3000/backend endpoint?', {
                questionText,
                questionType,
                relevantCourse
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        // You can store the newQuestion in an array or perform any other actions here
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
                    <option value="CS 1111 (Introduction to Programming in C/C++)">CS 1111 (Introduction to Programming in C/C++)</option>
                    <option value="CS 1121 (Introduction to Programming I)">CS 1121 (Introduction to Programming I)</option>
                    <option value="CS 1122 (Introduction to Programming II)">CS 1122 (Introduction to Programming II)</option>
                    <option value="CS 1131 (Accelerated Introduction to Programming)">CS 1131 (Accelerated Introduction to Programming)</option>
                    <option value="CS 1142 (Programming at the HW/SW Interface)">CS 1142 (Programming at the HW/SW Interface)</option>
                    <option value="CS 2311 (Discrete Structures)">CS 2311 (Discrete Structures)</option>
                    <option value="CS 2321 (Data Structures)">CS 2321 (Data Structures)</option>
                    <option value="Other">Other</option>
                </select>
                <Button variant="warning" type='submit'>Submit your question</Button>
            </form>
        </div>
    );

};

export default QuestionForm;