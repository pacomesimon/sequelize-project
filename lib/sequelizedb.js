"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

const user = 'me';
const host = 'localhost';
const database = 'api';
const password = 'password';
const port = '5432';
const sequelize = new _sequelize.Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false
});
var _default = sequelize;
exports.default = _default;