import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/user/registesUser";
import { VerifyOtpUseCase } from "../../application/use-cases/user/verifyOtp";
import { LoginUserUseCase } from "../../application/use-cases/user/loginUser";
import { ForgotPasswordUseCase } from "../../application/use-cases/user/forgetPassword";
import { VerifyResetPasswordOtpUseCase } from "../../application/use-cases/user/verifyForgetPassword";
import { ResetPasswordUseCase } from "../../application/use-cases/user/reserPassword";
import { GoogleLoginUseCase } from "../../application/use-cases/user/googlelogin";

export class UserController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            await RegisterUserUseCase.execute(req.body);
            res.status(201).json({ message: "User registered successfully. OTP sent to email." });
        } catch (error: any) {
            res.status(400).json({ message: "otp failed" });
        }
    }

    static async verifyOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body;
            await VerifyOtpUseCase.execute(email, otp);
            res.status(200).json({ message: "OTP verified successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
                return;
            }

            const result = await LoginUserUseCase.execute(email, password);
            res.status(200).cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7*24*60*60*1000
            }).json({ message: "Login successful", data: result });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            await ForgotPasswordUseCase.execute(email);
            res.status(200).json({ message: "Password reset otp sent" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async verifyResetPasswordOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body;
            await VerifyResetPasswordOtpUseCase.execute(email, otp);
            res.status(200).json({ message: "OTP verified successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            await ResetPasswordUseCase.execute(email, password);
            res.status(200).json({ message: "Password reset successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async googlelogin(req: Request, res: Response): Promise<void> {
        try {
            const {fullName, email, phoneNumber} = req.body;
            const result = await GoogleLoginUseCase.execute(fullName, email, phoneNumber); 
            res.status(200).cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7*24*60*60*1000
            }).json({ message: "Login successful", data: result });
        } catch (error: any) {
            res.status(400).json({message: error.message})
        }
    }
}
