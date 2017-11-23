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
        }).on('data', function (item) {
            console.log(Parser.oceanDataParser(item));
            //console.log(item);
        }));
}


export const weatherNowData = (weather, location) => {
    if (!weather) {
        return "唉唷, 出錯了."
    }

    let newData = new Array();
    newData.push(`現在天氣是${weather.desc} `);
    newData.push(`氣溫是${weather.temperature}度 `);

    weather.felt_air_temp < 20 ?
        newData.push(`體感溫度是${weather.felt_air_temp}度, 有點涼意 `) :
        newData.push(`體感溫度是${weather.felt_air_temp}度 `);

    weather.rainfall === 0 ?
        newData.push("今天不會下雨 ") :
        newData.push(`降雨機率: ${weather.rainfall}% `);

    weather.specials.length !== 0 ?
        newData.push(`現在有事了, ${weather.specials[0].title}, ${weather.specials[0].desc} `) :
        newData.push("這裡沒事兒 ");

    const reply = newData.reduce((pre, cur) => { return pre + cur }, `${location}: `);
    return reply;
}

/** 
http://opendata.cwb.gov.tw/api/v1/rest/datastore/{dataid}?
locationId={locationId}
&locationName={locationName}
&elementName={elementName}
&sort={sort}
&startTime={startTime}
&dataTime={dataTime}
&timeFrom={timeFrom}
&timeTo={timeTo} 
*/

/**test */

export const weatherPreData = (loc) =>{
    console.log(loc);
    let newData = new Array();
    loc.forEach((info)=>{
        newData.push(info.locationName);
        //newData.push(info.weatherElement[0].time[0].elementValue);
        //newData.push(info.weatherElement[0].time[1].elementValue);
    });
   // const reply = newData.reduce((pre, cur) => { return pre + cur }, `${locationName}: `);
    //console.log(reply);
    return reply;
}

export const getPredictionCityData = (cityID, cityName) => {
    console.log(`http://opendata.cwb.gov.tw/api/v1/rest/datastore/${data.predictionCityData}
                ?locationId=${cityID}&sort=time&elementName=WeatherDescription
                &Authorization=${data.apiKey}`);
        
    return (
        fetch(
            `http://opendata.cwb.gov.tw/api/v1/rest/datastore/${data.predictionCityData}?locationId=${cityID}&sort=time&elementName=WeatherDescription&Authorization=${data.apiKey}`, {
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
                return data.records.locations[0].location;
            })
            .catch((err) => {
                console.log(err);
            }));
}