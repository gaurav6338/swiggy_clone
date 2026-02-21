const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
const clientDistPath = path.join(__dirname, '..', 'swiggy-app', 'dist');
if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
}

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

app.use((req, res, next) => {
    if (req.method !== 'GET' || !req.headers.accept || !req.headers.accept.includes('text/html')) {
        return next();
    }
    const indexHtml = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
    } else {
        next();
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
