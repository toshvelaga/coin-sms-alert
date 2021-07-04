const _ = require('underscore');

// const coinDataRepo = require('../dataAccess/repos/coinDataRepository');
// const alarmRepo = require('../dataAccess/repos/alarmRepository');
const axios = require('axios')
// Import our new Alarm model
const Alarm = require('../models/alarm');

// Coin routes
exports.configure = (app) => {
   // RESTful coin routes
   app.get('/api/coins', getCoinData);
};

// Requests to http://localhost:3000/api/coins will trigger a request to coin gecko API,
// respond with a JSON object with coin prices, and log a message to the console.

// Get latest coin data, get all created alarms,
// determine if any alarms have thresholds that have been crossed,
// return coin data in JSON format
function getCoinData(req, res, done) {

    const coin = 'ethereum'
    const url = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`

    axios.get(url, {})
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
}




