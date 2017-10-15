'use strict';

var _linebot = require('linebot');

var _linebot2 = _interopRequireDefault(_linebot);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _weatherTaiwan = require('weather-taiwan');

var _weatherTaiwan2 = _interopRequireDefault(_weatherTaiwan);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _weather = require('./weather');

var goWeather = _interopRequireWildcard(_weather);

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

bot.on('message', function (event) {
  if (event.message.type = 'text') {
    var cityName = event.message.text;

    //const distrct = Object.values(gAllCity).filter((city) => {
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

    var distrctWeather = goWeather.getWeatherById(distrct[0].id).then(function (data) {
      Object.assign(distrctWeather, data);
    });
    setTimeout(function () {
      var replyText = distrctWeather.specials.length === 0 ? '\u73FE\u5728\u5929\u6C23' + distrctWeather.desc + ', \u6C23\u6EAB\u662F' + distrctWeather.temperature + '\u5EA6' : '\u73FE\u5728\u5929\u6C23' + distrctWeather.desc + ', \u6C23\u6EAB\u662F' + distrctWeather.temperature + '\u5EA6, \u6700\u8FD1\u6709' + distrctWeather.specials[0].title + ':' + distrctWeather.specials[0].desc;

      event.reply(replyText).then(function (data) {}).catch(function (error) {
        console.log('error');
      });
    }, 1000);
  }
});

var app = (0, _express2.default)();
var linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});