import  UserRepository  from "../../../infrastructure/repositories/userRepository";
import { OtpService } from "../../../domain/services/otpServices";

export class VerifyOtpUseCase {
    static async execute(email: string, otp: string): Promise<void> {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) throw new Error("User not found");

        if (!OtpService.isOtpValid(user.otp!, user.otpExpiry!, otp)) {
            throw new Error("Invalid or expired OTP");
        }

        await UserRepository.updateUserOtp(email, '', ''); // Clear OTP with undefined for expiry
    }
}
