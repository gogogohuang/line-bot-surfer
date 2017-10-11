import linebot from 'linebot';
import express from 'express';
import weatherTW from 'weather-taiwan';

import * as reply from './common/reply';

const bot = linebot({
  channelId: "1539958657",
  channelSecret: "e10b0956cb25191be66a7efe01131ea0",
  channelAccessToken: "liLIIlI5QQQ3FYSbY9kOtW6sREW+cH7Rmu1mGu72Ci3Fofv9H63h1Cwzx/UiHUJ1HHhkHwZon5MNNl8e37X3oYou47I2677QWLA6VT5km3RadMa2ln59k4IuKSfrBUHIOAYV5tTceqLhHzM/MVYQbgdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function (event) {
  if (event.message.type = 'text') {
    const msg = event.message.text;
    let replyText;

    const fetcher = weatherTW.fetch('CWB-27A80F1A-A586-4FDC-BE8A-641BF50848FA');
    const parser = weatherTW.parse();
    
    fetcher.pipe(parser);

    parser.on('data', function (data) {
      //console.log(data);
      if (data.locationName.indexOf(msg) !== 0) {
        replyText = "現在" + msg + "溫度是" + data.elements.TEMP + " 度";
      } else {
        replyText = "找不到";
      }
      event.reply(replyText).then(function (data) {
      }).catch(function (error) {
        // error 
        console.log('error');
      });
    });


  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log("App now running on port", port);
});

