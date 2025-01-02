import { Request, Response } from "express";
import { RegisterCompanyUseCase } from "../../application/use-cases/company/registerCompany";
import { VerifyCompanyOtpUseCase } from "../../application/use-cases/company/verifyOtp";
import { LoginCompanyUseCase } from "../../application/use-cases/company/loginCompany";


export class CompanyController{
    static async register(req:Request, res:Response): Promise<void>{
        try {
            await RegisterCompanyUseCase.execute(req.body);
            res.status(201).json({ message: "Company registered successfully. OTP sent to email." });
        } catch (error: any) {
            res.status(400).json({ message: "Failed to register company" });
        }
    }

    static async verifyOtp(req: Request, res: Response): Promise<void>{
        try {
            const {email, otp} = req.body;
            await VerifyCompanyOtpUseCase.execute(email, otp);
            res.status(200).json({ message: "OTP verified successfully" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async componyLogin(req: Request, res: Response): Promise<void>{
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: "Email and password are required" });
                return;
            }

            const result = await LoginCompanyUseCase.execute(email, password);
            res.status(200).json({ message: "Login successful", data: result });
        } catch (error) {
            
        }
    }
}