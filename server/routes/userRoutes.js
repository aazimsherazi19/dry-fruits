import express from "express";
const userRouter = express.Router();
import { userRegister, userLogin, adminLogin } from "../controllers/userController.js";

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);

export default userRouter;