import UserRepository from "../../../infrastructure/repositories/userRepository";
import { OtpService } from "../../../domain/services/otpServices";
import { EmailService } from "../../../infrastructure/email/emailService";





export class ForgotPasswordUseCase {
    static async execute(email: string): Promise<void> {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) throw new Error("User not found");

        const { otp, expiry } = OtpService.generateOtp();
        console.log(otp, expiry);
        

        await UserRepository.updateUserOtp(email, otp, expiry.toISOString());
        await EmailService.sendOtpEmail(email, otp);
    }
}
