import UserRepository from "../../../infrastructure/repositories/userRepository";



export class VerifyResetPasswordOtpUseCase {
    static async execute(email: string, otp: string): Promise<void> {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) throw new Error("User not found");

        if (user.otp !== otp) throw new Error("Invalid OTP");

        await UserRepository.updateUserOtp(email, '', '');
    }
}
