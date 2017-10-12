import linebot from 'linebot';
import express from 'express';
import weatherTW from 'weather-taiwan';
import fetch from 'node-fetch';

import * as reply from './common/reply';

const bot = linebot({
  channelId: "1539958657",
  channelSecret: "e10b0956cb25191be66a7efe01131ea0",
  channelAccessToken: "liLIIlI5QQQ3FYSbY9kOtW6sREW+cH7Rmu1mGu72Ci3Fofv9H63h1Cwzx/UiHUJ1HHhkHwZon5MNNl8e37X3oYou47I2677QWLA6VT5km3RadMa2ln59k4IuKSfrBUHIOAYV5tTceqLhHzM/MVYQbgdB04t89/1O/w1cDnyilFU="
});

let gCity = {};

/**hard-code */
const hCity = [
  { id: '1', name: '台北' },
  { id: '2', name: '基隆' },
  { id: '3', name: '新北' },
  { id: '4', name: '連江' },
  { id: '5', name: '宜蘭' },
  { id: '6', name: '新竹' },
  { id: '8', name: '桃園' },
  { id: '9', name: '苗栗' },
  { id: '10', name: '台中' },
  { id: '11', name: '彰化' },
  { id: '12', name: '南投' },
  { id: '13', name: '嘉義' },
  { id: '15', name: '雲林' },
  { id: '16', name: '台南' },
  { id: '17', name: '高雄' },
  { id: '18', name: '澎湖' },
  { id: '19', name: '金門' },
  { id: '20', name: '屏東' },
  { id: '21', name: '台東' },
  { id: '22', name: '花蓮' },
];

/**end */
function getAllCity() {
  fetch(
    `https://works.ioa.tw/weather/api/all.json`, {
      method: 'GET',
      mode: 'cors',
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      Object.assign(gCity, data);
    })
    .catch((err) => {
      console.log(err);
    })
}

bot.on('message', function (event) {
  if (event.message.type = 'text') {
    const city = hCity.find((x)=>{
      if(x.name === event.message.text){
        return true;
      }
    });
    console.log(city);
    fetch(
      `https://works.ioa.tw/weather/api/weathers/${city.id}.json`, {
        method: 'GET',
        mode: 'cors',
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        const replyText = `現在天氣` + data.desc + '氣溫' + data.temperature + '度';
        event.reply(replyText).then(function (data) {
        }).catch(function (error) {
          console.log('error');
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

const server = app.listen(process.env.PORT || 8080, function () {
  getAllCity();
  const port = server.address().port;
  console.log("App now running on port", port);
});

