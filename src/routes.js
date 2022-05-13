import express from "express";
import userController from "./controllers/userController";
const router = express.Router();


///////////////////////////////////////////////////////////////////////////////////////////

// router.post("/users/signin", userController.post);
router.post("/users/signup", userController.postSignup);
// router.patch("/users/update/:id",  userController.patch);
// router.delete("/users/delete/:id",  userController.delete);
// router.get("/users/:id", userController.getOne);
router.get("/users/",  userController.getAll);


export default router;