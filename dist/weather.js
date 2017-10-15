'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWeatherById = exports.getAllCity = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllCity = exports.getAllCity = function getAllCity() {
    return (0, _nodeFetch2.default)('https://works.ioa.tw/weather/api/all.json', {
        method: 'GET',
        mode: 'cors'
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        console.log(err);
    });
};

var getWeatherById = exports.getWeatherById = function getWeatherById(id) {
    return (0, _nodeFetch2.default)('https://works.ioa.tw/weather/api/weathers/' + id + '.json', {
        method: 'GET',
        mode: 'cors'
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        console.log(err);
    });
};