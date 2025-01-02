import ComponyRepository from "../../../infrastructure/repositories/companyRepository";
import { OtpService } from "../../../domain/services/otpServices";



export class VerifyCompanyOtpUseCase{
    static async execute(email: string, otp: string): Promise<void>{

        const company = await ComponyRepository.findComponyByEmail(email);
        if(!company) throw new Error("Company Not Found !");

        if (!OtpService.isOtpValid(company.otp!, company.otpExpiry!, otp)) {
            throw new Error("Invalid or expired OTP");
        }

        await ComponyRepository.updateCompanyOtp(email,"","");

    }
}