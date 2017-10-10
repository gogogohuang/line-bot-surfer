'use strict';

var _linebot = require('linebot');

var _linebot2 = _interopRequireDefault(_linebot);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _weatherTaiwan = require('weather-taiwan');

var _weatherTaiwan2 = _interopRequireDefault(_weatherTaiwan);

var _reply = require('./common/reply');

var reply = _interopRequireWildcard(_reply);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bot = (0, _linebot2.default)({
  channelId: "1539958657",
  channelSecret: "e10b0956cb25191be66a7efe01131ea0",
  channelAccessToken: "liLIIlI5QQQ3FYSbY9kOtW6sREW+cH7Rmu1mGu72Ci3Fofv9H63h1Cwzx/UiHUJ1HHhkHwZon5MNNl8e37X3oYou47I2677QWLA6VT5km3RadMa2ln59k4IuKSfrBUHIOAYV5tTceqLhHzM/MVYQbgdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function (event) {
  if (event.message.type = 'text') {
    var msg = event.message.text;
    var replyText = void 0;

    var fetcher = _weatherTaiwan2.default.fetch('CWB-27A80F1A-A586-4FDC-BE8A-641BF50848FA');
    var parser = _weatherTaiwan2.default.parse();
    fetcher.pipe(parser);

    parser.on('data', function (data) {
      if (data.parameters.CITY.indexOf(msg) !== 0) {
        replyText = "現在" + msg + "溫度是" + data.elements.TEMP + " 度";
      } else {
        replyText = "找不到";
      }

      event.reply(replyText).then(function (data) {}).catch(function (error) {
        // error 
        console.log('error');
      });
    });
  }
});

var app = (0, _express2.default)();
var linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});