"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function Client(userId, status) {
    _classCallCheck(this, Client);

    _initialiseProps.call(this);

    this.user = userId, this.status = status;
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.getUser = function () {
        return _this.user;
    };

    this.getStatus = function () {
        return _this.status;
    };

    this.setStatus = function (status) {
        _this.status = status;
    };
};