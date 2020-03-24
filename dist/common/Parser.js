"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oceanDataParser = void 0;

require("core-js/modules/es6.array.for-each");

var _idx = _interopRequireDefault(require("idx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var oceanDataParser = function oceanDataParser(data) {
  console.log(data);
  var elements = {};
  var weatherElement = (0, _idx["default"])(data, function (_) {
    return _.weatherElement;
  });
  weatherElement.forEach(function (element) {
    elements[element.children.elementName.value] = parseFloat(element.children.elementValue.children.value.value) + element.children.elementValue.children.measures.value;
  });
  var result = {
    //lat: parseFloat(data.children.lat.value),
    //lon: parseFloat(data.children.lon.value),
    locationName: data.children.locationName.value,
    stationId: data.children.stationId.value,
    obsTime: data.children.time.children.obsTime.value,
    elements: elements //parameters: parameters

  };
  return JSON.stringify(result);
};

exports.oceanDataParser = oceanDataParser;