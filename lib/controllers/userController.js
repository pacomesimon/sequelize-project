"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateAuthToken = newUserDetails => {
  const token = _jsonwebtoken.default.sign(newUserDetails, _config.default.get('jwtPrivateKey'));

  return token;
};

const userController = {};

userController.postSignup = async (req, res) => {
  let user = await _User.default.findAll({
    where: {
      email: req.body.email
    }
  });
  if (user.length != 0) return res.status(400).send({
    error: "Email is already registered by another user"
  });
  const salt = await _bcrypt.default.genSalt(10);
  const hashedPassword = await _bcrypt.default.hash(req.body.password, salt);
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    age: req.body.age,
    address: req.body.address
  };
  const result = await _User.default.create(newUserDetails);
  const token = generateAuthToken(newUserDetails); // res.header('user-id',user._id);
  // res.header('Access-Control-Expose-Headers','user-id');

  res.send({
    "x-auth-token": token,
    "user-details": result
  });
};

userController.getAll = async (req, res) => {
  try {
    const users = await _User.default.findAll();
    res.send(users);
  } catch (err) {
    res.status(404);
    res.send({
      error: err
    });
  }
};

var _default = userController;
exports.default = _default;