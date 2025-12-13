import express from "express"
import Order from "../models/orderModel.js";
import User from "../models/UserModel.js"

export const placeOrder = async (req, res)=>{
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = await Order.create(orderData)
        newOrder.save();
        
        User.findByIdAndUpdate(userId, {cartData: {}})
        res.json({success: true, message: "Order Placed"});

       
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// all orders fro admin
export const allOrders = async (req, res)=>{
try {
    const orders = await Order.find({});
    res.json({success: true, orders})
    
} catch (error) {
    res.json({success: false, message: error.message})
}
}

// user orders
export const userOrders = async (req, res)=>{
try {
    const {userId} = req.body;

    const orders = await Order.find({userId});
    res.json({success: true, orders})
} catch (error) {
    res.json({success: false, message:error.message})
}
}

// updateStatus
export const updateStatus = async (req, res)=>{
try {
    const {orderId, status} = req.body;

    await Order.findByIdAndUpdate(orderId, { status })

    res.json({success: true, message: "Order status updated successfuly"});
} catch (error) {
    res.json({success: false, message: error.message});
}
}