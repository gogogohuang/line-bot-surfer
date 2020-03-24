"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

require("core-js/modules/es6.object.define-property");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Client = function Client(userId, _status) {
  var _this = this;

  _classCallCheck(this, Client);

  _defineProperty(this, "getUser", function () {
    return _this.user;
  });

  _defineProperty(this, "getStatus", function () {
    return _this.status;
  });

  _defineProperty(this, "setStatus", function (status) {
    _this.status = status;
  });

  this.user = userId, this.status = _status;
};

exports.Client = Client;