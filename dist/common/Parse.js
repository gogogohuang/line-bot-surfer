'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Parser = undefined;

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Transform = _stream2.default.Transform;

var Parser = exports.Parser = function Parser(options) {

    if (!(undefined instanceof Parser)) return new Parser(options);

    options = undefined.options = options || {
        highWaterMark: 16,
        outputString: false
    };

    Transform.call(undefined, {
        highWaterMark: options.highWaterMark || 16,
        objectMode: true
    });
};

_util2.default.inherits(Parser, Transform);

Parser.prototype._transform = function (data, encoding, callback) {

    var elements = {};
    data.children.weatherElement.forEach(function (element) {
        elements[element.children.elementName.value] = parseFloat(element.children.elementValue.children.value.value);
    });

    var parameters = {};
    data.children.parameter.forEach(function (parameter) {
        parameters[parameter.children.parameterName.value] = parameter.children.parameterValue.value;
    });

    var result = {
        lat: parseFloat(data.children.lat.value),
        lon: parseFloat(data.children.lon.value),
        locationName: data.children.locationName.value,
        stationId: data.children.stationId.value,
        obsTime: data.children.time.children.obsTime.value,
        elements: elements,
        parameters: parameters
    };

    if (undefined.options.outputString) {
        undefined.push(JSON.stringify(result));
    } else {
        undefined.push(result);
    }

    callback();
};