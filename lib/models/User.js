"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelizedb = _interopRequireDefault(require("../sequelizedb"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _sequelize.Model {}

User.init({
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: _sequelizedb.default,
  modelName: 'users',
  timestamps: false
});
User.sync();
var _default = User;
exports.default = _default;