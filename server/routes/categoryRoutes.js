import express from "express";
const categoryRouter = express.Router();

import {
  addCategory,
  getCategories,
  getSubCategories,
  deleteCategory
} from "../controllers/categoryController.js";

import { adminAuth } from "../middlewares/adminAuth.js";

// Admin Routes
categoryRouter.post("/add", adminAuth, addCategory);
categoryRouter.delete("/delete", adminAuth, deleteCategory);

// Public / Admin Routes
categoryRouter.get("/list", getCategories);
categoryRouter.get("/sub-categories/:categoryName", getSubCategories);

export default categoryRouter;
