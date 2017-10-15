import linebot from 'linebot';
import express from 'express';
import weatherTW from 'weather-taiwan';
import fetch from 'node-fetch';

import * as goWeather from './weather';

const bot = linebot({
  channelId: "1539958657",
  channelSecret: "e10b0956cb25191be66a7efe01131ea0",
  channelAccessToken: "liLIIlI5QQQ3FYSbY9kOtW6sREW+cH7Rmu1mGu72Ci3Fofv9H63h1Cwzx/UiHUJ1HHhkHwZon5MNNl8e37X3oYou47I2677QWLA6VT5km3RadMa2ln59k4IuKSfrBUHIOAYV5tTceqLhHzM/MVYQbgdB04t89/1O/w1cDnyilFU="
});

const gAllCity = goWeather.getAllCity().then((data) => { Object.assign(gAllCity, data) });

bot.on('message', function (event) {
  if (event.message.type = 'text') {
    const cityName = event.message.text;

    const distrct = Object.values(gAllCity).filter((city) => {
      return (city.towns.filter(town => town.name.match(cityName) !== null).length !== 0);
    }).find((province) => {
      return (province.towns.filter((town) => {
        return (town.name.match(cityName) !== null);
      }));
    }).towns.
      filter((town) => { return (town.name.match(cityName) !== null) });

    const distrctWeather = goWeather.getWeatherById(distrct[0].id)
      .then((data) => {
          Object.assign(distrctWeather, data); 
      });
      setTimeout(function() {
        const replyText = distrctWeather.specials.length === 0? 
        `現在天氣${distrctWeather.desc}, 氣溫是${distrctWeather.temperature}度`:
        `現在天氣${distrctWeather.desc}, 氣溫是${distrctWeather.temperature}度, 最近有${distrctWeather.specials[0].title}:${distrctWeather.specials[0].desc}`
        ;
        
        event.reply(replyText).then(function (data) {
          
        }).catch(function (error) {
          console.log('error');
        });
      }, 1000);
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});

