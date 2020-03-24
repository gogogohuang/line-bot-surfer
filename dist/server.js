"use strict";

var _linebot = _interopRequireDefault(require("linebot"));

var _express = _interopRequireDefault(require("express"));

var goWeather = _interopRequireWildcard(require("./weather"));

var status = _interopRequireWildcard(require("./common/Common"));

var _Client = require("./common/Client");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bot = (0, _linebot.default)({
  channelId: "1539958657",
  channelSecret: "e10b0956cb25191be66a7efe01131ea0",
  channelAccessToken: "liLIIlI5QQQ3FYSbY9kOtW6sREW+cH7Rmu1mGu72Ci3Fofv9H63h1Cwzx/UiHUJ1HHhkHwZon5MNNl8e37X3oYou47I2677QWLA6VT5km3RadMa2ln59k4IuKSfrBUHIOAYV5tTceqLhHzM/MVYQbgdB04t89/1O/w1cDnyilFU="
});
const gAllCity = goWeather.getAllCity().then(data => {
  Object.assign(gAllCity, data);
});
let gGoWeatherStatus = status.STATUS_INIT;
let gClients = new Array();
bot.on('message', event => {
  /**Add client */
  event.source.profile().then(profile => {
    if (!gClients.find(client => client.user === profile.userId)) {
      let newClient = new _Client.Client(profile.userId, status.STATUS_INIT);
      gClients.push(newClient);
    } else {
      getReply(gClients.find(client => client.user === profile.userId), event);
    }
  }).catch(e => {
    console.log(e);
  });
});

const getReply = (client, event) => {
  if (event.message.type = 'text') {
    switch (client.status) {
      case status.STATUS_INIT:
        lineReply(event, "你可以問我關於天氣, 海洋");
        client.status = status.STATUS_START;
        break;

      case status.STATUS_START:
        const text = event.message.text;
        let replyText = "我找不到相關資料";

        switch (text) {
          case "天氣":
            client.status = status.STATUS_WEATHER;
            replyText = "你想問哪個城市?";
            break;

          case "海洋":
            client.status = status.STATUS_OCEAN;
            replyText = "你想問哪個城市?";
            break;

          default:
            client.status = status.STATUS_INIT;
            replyText = "想死嗎?";
            break;
        }

        lineReply(event, replyText);
        break;

      case status.STATUS_WEATHER:
        client.status = status.STATUS_INIT;
        getWeather(event);
        break;

      case status.STATUS_OCEAN:
        client.status = status.STATUS_INIT;
        lineReply(event, "我還沒做好, 你急屁"); //goWeather.getSeaData();

        break;

      case status.STATUS_END:
      default:
        client.status = status.STATUS_START;
        break;
    }
  }
};

const getWeather = event => {
  const cityName = event.message.text;

  try {
    const distrct = Object.keys(gAllCity).map(ele => gAllCity[ele]).filter(city => {
      return city.towns.filter(town => town.name.match(cityName) !== null).length !== 0;
    }).find(province => {
      return province.towns.filter(town => {
        return town.name.match(cityName) !== null;
      });
    }).towns.filter(town => {
      return town.name.match(cityName) !== null;
    });
    goWeather.getWeatherById(distrct[0].id).then(data => {
      return goWeather.weatherNowData(data, cityName);
    }).then(reply => {
      const replyText = reply;
      event.reply(replyText).then(function (data) {}).catch(function (error) {
        console.log('error');
      });
    });
  } catch (e) {
    const replyText = "沒這個地方, 供三小啦!";
    event.reply(replyText).then(function (data) {}).catch(function (error) {
      console.log('error');
    });
  }

  return 0;
};

const lineReply = (event, text) => {
  event.reply(text).then(function (data) {}).catch(function (error) {
    console.log('error');
  });
};

const app = (0, _express.default)();
const linebotParser = bot.parser();
app.post('/', linebotParser);
const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});