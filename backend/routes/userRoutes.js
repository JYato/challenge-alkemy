import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {register, confirm, authenticate, profile} from "../controllers/userController.js"


const router = express.Router();

//area publica
router.post("/", register);
router.get("/confirm/:token", confirm);
router.post("/login", authenticate);

//area privada
router.get("/profile", checkAuth, profile);


export default router;