import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();

//private
router.get("/", checkAuth, getTransactions);
router.post("/", checkAuth, addTransaction);
router.put("/:id", checkAuth, updateTransaction);
router.delete("/:id", checkAuth, deleteTransaction);

export default router;