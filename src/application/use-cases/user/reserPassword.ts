import UserRepository from "../../../infrastructure/repositories/userRepository";



export class ResetPasswordUseCase {
    static async execute(email: string, password: string): Promise<void> {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) throw new Error("User not found");

        await UserRepository.updateUserPassword(email, password);
    }
}
