const calculateSalaryPackage = require('./CalculateSalaryPackage');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.post('/calculate', (req, res) => {
    const { salary, industry, employment, education, hoursWorked } = req.body;
    try {
        const result = calculateSalaryPackage(salary, industry, employment, hoursWorked, education);
        res.json({ success: true, result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});


module.exports = app;
