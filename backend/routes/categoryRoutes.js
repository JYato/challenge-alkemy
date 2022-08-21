import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { getCategories, addCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

//without protection


//private
router.get("/", checkAuth, getCategories);
router.post("/", checkAuth, addCategory);
router.delete("/:id", checkAuth, deleteCategory);


export default router;
