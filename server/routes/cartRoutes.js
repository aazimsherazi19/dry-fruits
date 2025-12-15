import express from "express"
const cartRouter = express.Router();
import { addToCart, getUserCart, updateCart } from "../controllers/cartController.js";
import { userAuth } from "../middlewares/userAuth.js";

cartRouter.post("/add", userAuth, addToCart)
cartRouter.post("/update", userAuth, updateCart);
cartRouter.post("/user-cart", userAuth, getUserCart);

export default cartRouter;