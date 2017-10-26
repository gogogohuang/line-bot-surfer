import fetch from 'node-fetch';
import * as data from './common/V';
import * as Parser from './common/Parser';
import saxStream from 'sax-stream';
import hyperquest from 'hyperquest';

export const getAllCity = () => {
    return (fetch(
        `https://works.ioa.tw/weather/api/all.json`, {
            method: 'GET',
            mode: 'cors',
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Server response wasn\'t OK');
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        }));
}

export const getWeatherById = (id) => {
    return (
        fetch(
            `https://works.ioa.tw/weather/api/weathers/${id}.json`, {
                method: 'GET',
                mode: 'cors',
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Server response wasn\'t OK');
                }
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            }));
}

export const getSeaData = () => {
    hyperquest(`http://opendata.cwb.gov.tw/opendataapi?dataid=${data.seaData}&authorizationkey=${data.apiKey}`)
    .pipe(saxStream({
      strict: true,
      tag: 'location'
    })
    .on('data', function(item) {    
        console.log(Parser.oceanDataParser(item));
      //console.log(item);
    }));
}