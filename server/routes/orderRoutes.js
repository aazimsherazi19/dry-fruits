import express from "express";
const orderRouter = express.Router();
import {placeOrder, allOrders, userOrders, updateStatus } from "../controllers/orderController.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { userAuth } from "../middlewares/userAuth.js";

// Admin Routes
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/update-status", adminAuth, updateStatus);

// User Routes
orderRouter.post("/place-order", userAuth, placeOrder);
orderRouter.get("/user-orders", userAuth, userOrders);

export default orderRouter;