import express from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/verify-otp", UserController.verifyOtp);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/verify-reset-password-otp", UserController.verifyResetPasswordOtp);
router.post("/reset-password", UserController.resetPassword);
router.post("/googlelogin", UserController.googlelogin)

export default router;
