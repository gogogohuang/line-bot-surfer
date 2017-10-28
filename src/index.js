import linebot from 'linebot';
import express from 'express';
import weatherTW from 'weather-taiwan';
import fetch from 'node-fetch';

import * as goWeather from './weather';
import * as status from './common/Common';


const bot = linebot({
  channelId: "1539958657",
  channelSecret: "e10b0956cb25191be66a7efe01131ea0",
  channelAccessToken: "liLIIlI5QQQ3FYSbY9kOtW6sREW+cH7Rmu1mGu72Ci3Fofv9H63h1Cwzx/UiHUJ1HHhkHwZon5MNNl8e37X3oYou47I2677QWLA6VT5km3RadMa2ln59k4IuKSfrBUHIOAYV5tTceqLhHzM/MVYQbgdB04t89/1O/w1cDnyilFU="
});

const gAllCity = goWeather.getAllCity().then((data) => { Object.assign(gAllCity, data) });

let gGoWeatherStatus = status.statusInit;

bot.on('message', function (event) {
  if (event.message.type = 'text') {
    let replyText = "想問什麼";
    switch (gGoWeatherStatus) {
      case status.statusInit:
      lineReply(event, "你可以問我關於天氣, 海洋");
      gGoWeatherStatus = status.statusStart;
      break;

      case status.statusStart:
        const text = event.message.text;
        let replyText = "我找不到相關資料";
        switch (text) {
          case "天氣":
            gGoWeatherStatus = status.statusWeather;
            replyText = "你想問哪個城市?";
            break;

          case "海洋":
           gGoWeatherStatus = status.statusOcean;
           replyText = "你想問哪個城市?";           
           break;

          default:
            gGoWeatherStatus = status.statusInit;
            replyText= "想死嗎?";
            break;
        }
        lineReply(event, replyText);
        break;

      case status.statusWeather:
        gGoWeatherStatus = status.statusInit;      
        getWeather(event);
        break;

      case status.statusOcean:
        gGoWeatherStatus = status.statusInit;
        lineReply(event, "我還沒做好, 你急屁");
        //goWeather.getSeaData();
        break;

      case status.statusEnd:
      default:
        gGoWeatherStatus = status.statusStart;
        break;
    }
  }
});

function getWeather(event) {
  const cityName = event.message.text;

  try {
    const distrct = Object.keys(gAllCity).map((ele) => gAllCity[ele])
      .filter((city) => {
        return (city.towns.filter(town => town.name.match(cityName) !== null).length !== 0);
      }).find((province) => {
        return (province.towns.filter((town) => {
          return (town.name.match(cityName) !== null);
        }));
      }).towns.filter((town) => { return (town.name.match(cityName) !== null) });
    goWeather.getWeatherById(distrct[0].id)
      .then((data) => {
        const reply = data.specials.length === 0 ?
          `現在天氣${data.desc}, 氣溫是${data.temperature}度` :
          `現在天氣${data.desc}, 氣溫是${data.temperature}度, 最近有${data.specials[0].title}:${data.specials[0].desc}`;
        return (reply);
      })
      .then((reply) => {
        const replyText = reply;
        event.reply(replyText).then(function (data) {

        }).catch(function (error) {
          console.log('error');
        });
      });
  }
  catch (e) {
    const replyText = "沒這個地方, 供三小啦!";
    event.reply(replyText).then(function (data) {
    }).catch(function (error) {
      console.log('error');
    });
  }
  return 0;
}

function lineReply(event, text){
  event.reply(text).then(function (data) {
  }).catch(function (error) {
    console.log('error');
  });
}

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});

