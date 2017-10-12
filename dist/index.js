'use strict';

var _linebot = require('linebot');

var _linebot2 = _interopRequireDefault(_linebot);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _weatherTaiwan = require('weather-taiwan');

var _weatherTaiwan2 = _interopRequireDefault(_weatherTaiwan);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _reply = require('./common/reply');

var reply = _interopRequireWildcard(_reply);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bot = (0, _linebot2.default)({
  channelId: "1539958657",
  channelSecret: "e10b0956cb25191be66a7efe01131ea0",
  channelAccessToken: "liLIIlI5QQQ3FYSbY9kOtW6sREW+cH7Rmu1mGu72Ci3Fofv9H63h1Cwzx/UiHUJ1HHhkHwZon5MNNl8e37X3oYou47I2677QWLA6VT5km3RadMa2ln59k4IuKSfrBUHIOAYV5tTceqLhHzM/MVYQbgdB04t89/1O/w1cDnyilFU="
});

var gCity = {};

/**hard-code */
var hCity = [{ id: '1', name: '台北' }, { id: '2', name: '基隆' }, { id: '3', name: '新北' }, { id: '4', name: '連江' }, { id: '5', name: '宜蘭' }, { id: '6', name: '新竹' }, { id: '8', name: '桃園' }, { id: '9', name: '苗栗' }, { id: '10', name: '台中' }, { id: '11', name: '彰化' }, { id: '12', name: '南投' }, { id: '13', name: '嘉義' }, { id: '15', name: '雲林' }, { id: '16', name: '台南' }, { id: '17', name: '高雄' }, { id: '18', name: '澎湖' }, { id: '19', name: '金門' }, { id: '20', name: '屏東' }, { id: '21', name: '台東' }, { id: '22', name: '花蓮' }];

/**end */
function getAllCity() {
  (0, _nodeFetch2.default)('https://works.ioa.tw/weather/api/all.json', {
    method: 'GET',
    mode: 'cors'
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
  }).then(function (data) {
    Object.assign(gCity, data);
  }).catch(function (err) {
    console.log(err);
  });
}

bot.on('message', function (event) {
  if (event.message.type = 'text') {
    var city = hCity.find(function (x) {
      if (x.name === event.message.text) {
        return true;
      }
    });
    console.log(city);
    (0, _nodeFetch2.default)('https://works.ioa.tw/weather/api/weathers/' + city.id + '.json', {
      method: 'GET',
      mode: 'cors'
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
    }).then(function (data) {
      console.log(data);
      var replyText = '\u73FE\u5728\u5929\u6C23' + data.desc + '氣溫' + data.temperature + '度';
      event.reply(replyText).then(function (data) {}).catch(function (error) {
        console.log('error');
      });
    }).catch(function (err) {
      console.log(err);
    });
  }
});

var app = (0, _express2.default)();
var linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function () {
  getAllCity();
  var port = server.address().port;
  console.log("App now running on port", port);
});