"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schemas = {
  user: _joi.default.object().keys({
    name: _joi.default.string().required(),
    email: _joi.default.string().required(),
    password: _joi.default.string().required(),
    age: _joi.default.string().required(),
    address: _joi.default.string().required()
  }),
  userSignin: _joi.default.object().keys({
    email: _joi.default.string().required(),
    password: _joi.default.string().required()
  }) // future schemas will be defined here below ...

};
var _default = schemas;
exports.default = _default;