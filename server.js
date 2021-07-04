// server.js

const express = require('express');
const axios = require('axios')
const app = express();
const _ = require('underscore');
// Import our new Alarm model
const Alarm = require('./models/alarm');

// Requests to http://localhost:3000/ will respond with a JSON object
app.get('/', (req, res) => {
    res.json({ success: true });
});

// Requests to http://localhost:3000/api/coins will trigger a request to coin gecko API,
// respond with a JSON object with coin prices, and log a message to the console.

let coin = 'ethereum'

const url = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`

app.set('json spaces', 2)

app.get('/api/coins', (req, res) => {
    axios.get(url, {
    })
    .then(response => { 
        let coinsData = response.data
        // console.log(coinData)

        // Hardcode an Alarm with a low value to ensure alarm will trigger
        let alarm = new Alarm({
           coin_id: 'ethereum',
           priceUsdThreshold: 1000.00,
           thresholdDirection: 'over'
       });

        // Find Bitcoin’s data object inside response collection
       let latestCoinDataPrice = coinsData.tickers[1].converted_last.usd

       //  Log the alarm data to the console if the threshold is crossed
       if (latestCoinDataPrice && alarm.isTriggered(latestCoinDataPrice)) {
           console.log(`* ALARM * ${coin}: $${latestCoinDataPrice} is ${ alarm.thresholdDirection} threshold $${alarm.priceUsdThreshold}`);
       }
       // Return a JSON object of the CoinMarketCap API response
       console.log(coinsData.tickers[1].converted_last.usd)
       res.json(coinsData.tickers);
    })
    .catch(err => { 
        res.json(err)
        console.log(err)
    });
});

// Start listening on port 3000 to start receiving requests
app.listen(3000, () => {
    console.log('Coin Alert app listening on port 3000!')
});