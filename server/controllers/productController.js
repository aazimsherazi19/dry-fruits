import express from "express"
import Product from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"

// add product
export const addProduct = async (req, res)=> {
 try {
    const {userId, description, variations, category ,subCategory, bestSeller} = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item)=> item !== undefined);

    let imagesUrl = await Promise.all(
        images.map(async (item)=>{
     const result = await cloudinary.uploader.upload(item.path, {
        resource_type: 'image'
     })
     return result.secure_url
    }))


    const newProduct = {
        userId,
        description,
        variations: JSON.parse(variations),
        category,
        subCategory,
        bestSeller: bestSeller === "true" ? true : false,
        images: imagesUrl,
        date: Date.now()

    }

    const product = Product.create(newProduct);
    await product.save();

    res.json({success: true, message: "Product Added Successfully"});
 } catch (error) {
    res.json({success: false, message: error.message});
 }
}

// list products
export const listProducts = async (req, res)=>{
try {
   const products = await Product.find({})
   res.json({success: true, products})
} catch (error) {
   res.json({success: false, message: error.message})
}
}
// remove products 
export const removeProduct = async (req, res)=>{
  try {
   await Product.findByIdAndDelete(req.body.id);
   res.json({success: true, message: "Product removed"})
  } catch (error) {
   res.json({success: false, message: error.message})
  }
}

// single product
export const singleProduct = async (req, res)=>{
try {
   const { productId } = req.body;

   const product = await Product.findById(productId);
   res.json({success: true, product})
} catch (error) {
   res.json({success: false, message: error.message})
}
}