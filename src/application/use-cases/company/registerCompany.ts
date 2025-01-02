import { OtpService } from "../../../domain/services/otpServices";
import { ICompany } from "../../../infrastructure/database/models/companyModel";
import { EmailService } from "../../../infrastructure/email/emailService";
import ComponyRepository from "../../../infrastructure/repositories/companyRepository";
import { PasswordHasher } from "../../../infrastructure/security/passwordhasher";






export class RegisterCompanyUseCase{
    static async execute(data:{ companyname: string, companyphone: string, email: string, password: string}): Promise<void>{

        const {companyname, companyphone, email, password} = data;

        const existingCompany = await ComponyRepository.findComponyByEmail(email);
        if(existingCompany) throw new Error("Company already Exists");

        const {otp, expiry} = await OtpService.generateOtp();
        console.log("company registration", otp, expiry);

        const hashedPassword = await PasswordHasher.hashPassword(password);

        const companyData = { companyname, companyphone, email, password: hashedPassword, otp, otpExpiry: otp } as unknown as ICompany;
        await ComponyRepository.register(companyData);
        await EmailService.sendOtpEmail(email, otp);
        
        
    }
}