const express = require('express');
const routes = require('./routes/routes');
const app = express();

app.set('json spaces', 2)

// Start listening on port 3000 to start receiving requests
app.listen(3000, () => {
   console.log('Coin Alert app listening on port 3000!');

    // Set up routes
    routes.configure(app);
});