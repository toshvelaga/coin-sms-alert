// models/alarm.js
const _ = require('underscore');

class Alarm {

   constructor(data) {
       // put data object onto Alarm object
       _.extend(this, data);
   }

   // Returns a boolean based on whether alarm threshold has been exceeded
   isTriggered(latestCoinDataPrice) {
       let isAlarmTriggered = false;
       switch (this.thresholdDirection) {
           case 'under':
               isAlarmTriggered = latestCoinDataPrice < this.priceUsdThreshold; break; case 'over': default: isAlarmTriggered = latestCoinDataPrice > this.priceUsdThreshold;
               break;
       }
       return isAlarmTriggered;
   }
}

module.exports = Alarm;