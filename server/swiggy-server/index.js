const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const serverless = require("serverless-http");

const app = express();
app.use(express.static('dist'));

const port = 5000;

app.use(express.json());
app.use(cors())
app.use(express.static("public"));

app.get('/categories', (req, res) => {

    const filePath = path.join(__dirname, 'data/category.json');


    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const categories = JSON.parse(data);
            res.json(categories);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});
app.get('/top-restaurant-chains', (req, res) => {
 
    const filePath = path.join(__dirname, 'data/restaurantChains.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const restaurantChains = JSON.parse(data);
            res.json(restaurantChains);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});



// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });

module.exports = serverless(app);