const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();



app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
const clientDistPath = path.join(__dirname, '..', 'swiggy-app', 'dist');
app.use(express.static(clientDistPath));

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

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use((req, res, next) => {
    if (req.method !== 'GET' || !req.headers.accept || !req.headers.accept.includes('text/html')) {
        return next();
    }
    const indexHtml = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
        return;
    }
    res.send('<!doctype html><html><head><meta charset="utf-8"><title>App</title></head><body><h1>Server is running</h1></body></html>');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
