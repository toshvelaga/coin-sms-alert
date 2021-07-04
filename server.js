// server.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const app = express();

// Use body-parser as middleware so that we have JSON data available on Request objects
app.use(bodyParser.json({ type: 'application/json' }));

// Requests to http://localhost:3000/ will respond with a JSON object
app.get('/', (req, res) => {
    res.json({ success: true });
});

// Requests to http://localhost:3000/api/coins will trigger a request to CoinMarketCap API,
// respond with a JSON object with coin prices, and log a message to the console.
app.get('/api/coins', (req, res) => {
    // res.json({ success: true });
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => res.json(response.data))
        .catch(err => res.json(err));
});

// Start listening on port 3000 to start receiving requests
app.listen(3000, () => {
    console.log('Coin Alert app listening on port 3000!')
});