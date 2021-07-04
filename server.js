const express = require('express');
const routes = require('./routes/routes');
const app = express();

app.set('json spaces', 2)

// Start listening on port 3000 to start receiving requests

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log('Coin SMS Alert app listening on port 3000!');

    // Set up routes
    routes.configure(app);
});