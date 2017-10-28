import fetch from 'node-fetch';

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
