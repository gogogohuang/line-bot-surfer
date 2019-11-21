'use strict';

var _linebot = require('linebot');

var _linebot2 = _interopRequireDefault(_linebot);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _weather = require('./weather');

var goWeather = _interopRequireWildcard(_weather);

var _Common = require('./common/Common');

var status = _interopRequireWildcard(_Common);

var _Client = require('./common/Client');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bot = (0, _linebot2.default)({
  channelId: "1539958657",
  channelSecret: "e10b0956cb25191be66a7efe01131ea0",
  channelAccessToken: "liLIIlI5QQQ3FYSbY9kOtW6sREW+cH7Rmu1mGu72Ci3Fofv9H63h1Cwzx/UiHUJ1HHhkHwZon5MNNl8e37X3oYou47I2677QWLA6VT5km3RadMa2ln59k4IuKSfrBUHIOAYV5tTceqLhHzM/MVYQbgdB04t89/1O/w1cDnyilFU="
});

var gAllCity = goWeather.getAllCity().then(function (data) {
  Object.assign(gAllCity, data);
});

var gGoWeatherStatus = status.STATUS_INIT;
var gClients = new Array();

bot.on('message', function (event) {
  /**Add client */
  event.source.profile().then(function (profile) {
    if (!gClients.find(function (client) {
      return client.user === profile.userId;
    })) {
      var newClient = new _Client.Client(profile.userId, status.STATUS_INIT);
      gClients.push(newClient);
    } else {
      getReply(gClients.find(function (client) {
        return client.user === profile.userId;
      }), event);
    }
  }).catch(function (e) {
    console.log(e);
  });
});

var getReply = function getReply(client, event) {
  if (event.message.type = 'text') {
    var replyText = "想問什麼";
    switch (client.status) {
      case status.STATUS_INIT:
        lineReply(event, "你可以問我關於天氣, 海洋");
        client.status = status.STATUS_START;
        break;

      case status.STATUS_START:
        var text = event.message.text;
        var _replyText = "我找不到相關資料";
        switch (text) {
          case "天氣":
            client.status = status.STATUS_WEATHER;
            _replyText = "你想問哪個城市?";
            break;

          case "海洋":
            client.status = status.STATUS_OCEAN;
            _replyText = "你想問哪個城市?";
            break;

          default:
            client.status = status.STATUS_INIT;
            _replyText = "想死嗎?";
            break;
        }
        lineReply(event, _replyText);
        break;

      case status.STATUS_WEATHER:
        client.status = status.STATUS_INIT;
        getWeather(event);
        break;

      case status.STATUS_OCEAN:
        client.status = status.STATUS_INIT;
        lineReply(event, "我還沒做好, 你急屁");
        //goWeather.getSeaData();
        break;

      case status.STATUS_END:
      default:
        client.status = status.STATUS_START;
        break;
    }
  }
};

var getWeather = function getWeather(event) {
  var cityName = event.message.text;

  try {
    var distrct = Object.keys(gAllCity).map(function (ele) {
      return gAllCity[ele];
    }).filter(function (city) {
      return city.towns.filter(function (town) {
        return town.name.match(cityName) !== null;
      }).length !== 0;
    }).find(function (province) {
      return province.towns.filter(function (town) {
        return town.name.match(cityName) !== null;
      });
    }).towns.filter(function (town) {
      return town.name.match(cityName) !== null;
    });
    goWeather.getWeatherById(distrct[0].id).then(function (data) {
      return goWeather.weatherNowData(data, cityName);
    }).then(function (reply) {
      var replyText = reply;
      event.reply(replyText).then(function (data) {}).catch(function (error) {
        console.log('error');
      });
    });
  } catch (e) {
    var replyText = "沒這個地方, 供三小啦!";
    event.reply(replyText).then(function (data) {}).catch(function (error) {
      console.log('error');
    });
  }
  return 0;
};

var lineReply = function lineReply(event, text) {
  event.reply(text).then(function (data) {}).catch(function (error) {
    console.log('error');
  });
};

var app = (0, _express2.default)();
var linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});