"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.object.assign");

var _linebot = _interopRequireDefault(require("linebot"));

var _express = _interopRequireDefault(require("express"));

var goWeather = _interopRequireWildcard(require("./weather"));

var status = _interopRequireWildcard(require("./common/Common"));

var _Client = require("./common/Client");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bot = (0, _linebot["default"])({
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
  })["catch"](function (e) {
    console.log(e);
  });
});

var getReply = function getReply(client, event) {
  if (event.message.type = 'text') {
    switch (client.status) {
      case status.STATUS_INIT:
        lineReply(event, "你可以問我關於天氣, 海洋");
        client.status = status.STATUS_START;
        break;

      case status.STATUS_START:
        var text = event.message.text;
        var replyText = "我找不到相關資料";

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
      event.reply(replyText).then(function (data) {})["catch"](function (error) {
        console.log('error');
      });
    });
  } catch (e) {
    var replyText = "沒這個地方, 供三小啦!";
    event.reply(replyText).then(function (data) {})["catch"](function (error) {
      console.log('error');
    });
  }

  return 0;
};

var lineReply = function lineReply(event, text) {
  event.reply(text).then(function (data) {})["catch"](function (error) {
    console.log('error');
  });
};

var app = (0, _express["default"])();
var linebotParser = bot.parser();
app.post('/', linebotParser);
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});