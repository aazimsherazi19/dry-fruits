import express from "express";
import Category from "../models/categoryModel.js";

export const addCategory = async (req, res)=>{
    try {
        const {name, subCategories} = req.body;

        const exist = await Category.findOne({name})
        if(exist){
         return res.json({success: false, message: "Category already exists"});
        } 

        const category = await Category.create({
         name,
         subCategories
        });

        res.json({success: true, message: "Category added successfully", category})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getCategories = async (req, res)=>{
    try {
        const categories = await Category.find({});
        res.json({success: true, categories})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getSubCategories = async (req, res)=>{
    try {
        const {categoryName} = req.params;

        const category = await Category.findOne({name: categoryName});

        if(!category){
            return res.json({
                success: false,
                message: "Category not found",
            })
        }
        res.json({
            success: true,
            subCategories: category.subCategories
        })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteCategory = async (req, res)=>{
    try {
        const {id} = req.body;

        await Category.findByIdAndDelete(id);
        res.json({success: true, message: "Category deleted successfully"})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}