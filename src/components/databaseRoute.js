const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

//use cords for all routing
app.use(cors());
//middleware to parse JSON
app.use(express.json());

//TODO:
//handle question form submissions
//http://[YourServerDomain]:[Port]/submit-question-place
app.post('/submit-question-place', (req, res) => {
    //extract submitted form data from the request body
    const { questionText, questionType, relevantCourse } = req.body;
    
    //format submission data as one string
    const submission = `Question: ${questionText}\nType: ${questionType}\nRelevant Course: ${relevantCourse}\n`;

    //append submission data to 'database.txt'
    fs.appendFile('database.txt', submission, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to save to database');
        }
        res.send('database received question data');
    });
});

app.listen(PORT, () => console.log(`The port running is ${PORT}`));
