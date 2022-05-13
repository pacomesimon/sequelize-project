"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("./controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); ///////////////////////////////////////////////////////////////////////////////////////////
// router.post("/users/signin", userController.post);


router.post("/users/signup", _userController.default.postSignup); // router.patch("/users/update/:id",  userController.patch);
// router.delete("/users/delete/:id",  userController.delete);
// router.get("/users/:id", userController.getOne);

router.get("/users/", _userController.default.getAll);
var _default = router;
exports.default = _default;