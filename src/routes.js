import express from "express";
import userController from "./controllers/userController"; 
import auth from './authentication/auth';
const router = express.Router();


///////////////////////////////////////////////////////////////////////////////////////////

router.post("/users/signin", userController.post);
router.post("/users/signup", userController.postSignup);
router.patch("/users/update/:id", auth , userController.patch);
router.delete("/users/delete/:id", auth,  userController.delete);
router.get("/users/:id", userController.getOne);
router.get("/users/", auth,  userController.getAll);


export default router;