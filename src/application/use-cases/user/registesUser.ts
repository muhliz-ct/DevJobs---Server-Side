import { OtpService } from "../../../domain/services/otpServices";
import  UserRepository  from "../../../infrastructure/repositories/userRepository";
import { EmailService } from "../../../infrastructure/email/emailService";
import type { IUser } from '../../../infrastructure/database/models/userModel';
import { PasswordHasher } from "../../../infrastructure/security/passwordhasher";

interface ICreateUserData {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    otp: string;
    otpExpiry: Date;
}

export class RegisterUserUseCase {
    static async execute(data: { fullName: string; phoneNumber: string; email: string; password: string }): Promise<void> {
        const { fullName, phoneNumber, email, password } = data;



        const existingUser = await UserRepository.findUserByEmail(email);
        if (existingUser) throw new Error("User already exists");



        const { otp, expiry } = await OtpService.generateOtp();
        console.log(otp,expiry);
        
        const hashedPassword = await PasswordHasher.hashPassword(password);
        
        const userData = { fullName, phoneNumber, email, password : hashedPassword, otp, otpExpiry: expiry } as IUser;
        await UserRepository.createUser(userData);
        await EmailService.sendOtpEmail(email, otp);
    }
}
