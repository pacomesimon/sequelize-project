"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("./controllers/userController"));

var _auth = _interopRequireDefault(require("./authentication/auth"));

var _schemas = _interopRequireDefault(require("./validation/schemas"));

var _middleware = _interopRequireDefault(require("./validation/middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); ///////////////////////////////////////////////////////////////////////////////////////////


router.post("/users/signin", (0, _middleware.default)(_schemas.default.userSignin), _userController.default.post);
router.post("/users/signup", (0, _middleware.default)(_schemas.default.user), _userController.default.postSignup);
router.patch("/users/update/:id", _auth.default, _userController.default.patch);
router.delete("/users/delete/:id", _auth.default, _userController.default.delete);
router.get("/users/:id", _userController.default.getOne);
router.get("/users/", _auth.default, _userController.default.getAll);
var _default = router;
exports.default = _default;