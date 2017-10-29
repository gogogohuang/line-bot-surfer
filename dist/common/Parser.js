"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var oceanDataParser = exports.oceanDataParser = function oceanDataParser(data) {
    var elements = {};
    data.children.time.children.weatherElement.forEach(function (element) {
        elements[element.children.elementName.value] = parseFloat(element.children.elementValue.children.value.value) + element.children.elementValue.children.measures.value;
    });

    // let parameters = {};
    // data.children.parameter.forEach((parameter) => {
    //     parameters[parameter.children.parameterName.value] = parameter.children.parameterValue.value;
    // })
    var result = {
        //lat: parseFloat(data.children.lat.value),
        //lon: parseFloat(data.children.lon.value),
        locationName: data.children.locationName.value,
        stationId: data.children.stationId.value,
        obsTime: data.children.time.children.obsTime.value,
        elements: elements
        //parameters: parameters
    };

    return JSON.stringify(result);
};

var predictionCityDataParser = exports.predictionCityDataParser = function predictionCityDataParser(data) {
    var elements = {};
    data.children.time.children.weatherElement.forEach(function (element) {
        elements[element.children.elementName.value] = parseFloat(element.children.elementValue.children.value.value) + element.children.elementValue.children.measures.value;
    });

    // let parameters = {};
    // data.children.parameter.forEach((parameter) => {
    //     parameters[parameter.children.parameterName.value] = parameter.children.parameterValue.value;
    // })
    var result = {
        //lat: parseFloat(data.children.lat.value),
        //lon: parseFloat(data.children.lon.value),
        locationName: data.children.locationName.value,
        stationId: data.children.stationId.value,
        obsTime: data.children.time.children.obsTime.value,
        elements: elements
        //parameters: parameters
    };

    return JSON.stringify(result);
};