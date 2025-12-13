import express from "express"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js" 

// create token
export const createToken = (id)=>{
   return jwt.sign({id}, process.env.JWT_SECRET_KEY);
}

// User Register
export const userRegister = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const exist = await User.find({email});
        if(exist){
            return res.json({success: false, message: "User already exist!"})
        }

        if(!validator.isEmail(email)){
         return res.json({success: false, message:"Enter valid email address"})
        }

        if(password.length < 8){
            return res.json({success: false, message: "Please enter strong password"})
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success: true, token});
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
} 

// user login
export const userLogin = async (req, res)=> {
try {
    const {email, password} = req.body;
    const user = await User.find({email});

    if(!user){
        return res.json({success: false, message: "User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if(isMatch){
        const token = createToken(user._id);
        return res.json({success: true, token})
    } else {
        return res.json({success: false, message: "Invalid credentials"})
    }
} catch (error) {
    res.json({success: false, message: error.message})
}
}

// admin login
export const adminLogin = async(req, res)=> {
  try {
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
        return res.json({success: true, token});
    }
  } catch (error) {
    res.json({success: true, message: error.message});
  } 
}