const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

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
    
    //format submission data as CSV row
    const submission = `"${questionText}","${questionType}","${relevantCourse}"\n`;
    // Check if the file exists
    fs.access('src/components/database.csv', fs.constants.F_OK, (err) => {
        if (err) {
            // If file doesn't exist, add CSV headers
            fs.writeFile('src/components/database.csv', 'Question,Type,Relevant Course\n', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Failed to create database file');
                }
                appendToCSV(submission, res);
            });
        } else {
            // If file exists, directly append data
            appendToCSV(submission, res);
        }
    });
});

// Function to append data to CSV file
function appendToCSV(data, res) {
    fs.appendFile('src/components/database.csv', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to save to database');
        }
        res.send('Database received question data');
    });
}

// Endpoint to retrieve CSV data
app.get('/get-csv-data', (req, res) => {
    fs.readFile('src/components/database.csv', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to read database file');
        }
        res.send(data);
    });
});

app.listen(PORT, () => console.log(`The port running is ${PORT}`));
