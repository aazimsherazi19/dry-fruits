import User from "../models/UserModel.js";

export const addToCart = async (req, res)=>{
   try {
    const { userId, productId, weight} = req.body;
    const user = await User.findById(userId);
    if(!user){
        return res.json({success: false, message: "Please Login to continue"});
    }
    let cartData = user.cartData || {};
    if(cartData[productId]){
        if(cartData[productId][weight]){
            cartData[productId][weight] += 1;
        } else {
            cartData[productId][weight] = 1;
        }
    } else {
        cartData[productId] = {[weight]: 1};
    }
    await User.findByIdAndUpdate(userId, { cartData });
    res.json({success: true, message: "Product added to cart"});
   } catch (error) {
    res.json({success: false, message: error.message});
   }
}

export const updateCart = async (req, res)=> {
    try {
        const { userId, productId, weight, quantity} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.json({success: false, message: "Please login to continue"})
        }
        let cartData = user.cartDta || {};
        if(quantity <= 0){
            delete cartData[productId][weight];

            if(Object.keys(cartData[productId]).length === 0){
                delete cartData[productId];
            }
        } else {
            cartData[productId][weight] = quantity;
        }
        await User.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Cart updated"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getUserCart = async (req, res)=> {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.json({success: false, message: "Please login to continue"})
        }
        let cartData = user.cartData || {};
        res.json({success: true, cartData});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}