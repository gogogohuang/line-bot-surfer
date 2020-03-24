"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Client {
  constructor(userId, _status) {
    _defineProperty(this, "getUser", () => this.user);

    _defineProperty(this, "getStatus", () => this.status);

    _defineProperty(this, "setStatus", status => {
      this.status = status;
    });

    this.user = userId, this.status = _status;
  }

}

exports.Client = Client;