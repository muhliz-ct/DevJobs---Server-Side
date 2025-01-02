import  UserRepository  from "../../../infrastructure/repositories/userRepository";
import { AuthService } from "../../../domain/services/authService";
import { JwtHandler } from "../../../infrastructure/security/jwtHandler";

export class LoginUserUseCase {
    static async execute(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: object }> {
        
        const user = await UserRepository.findUserByEmail(email);
        if (!user) throw new Error("Invalid email or password");

       
        const isPasswordValid = await AuthService.verifyPassword(user.password, password);
        if (!isPasswordValid) throw new Error("Invalid email or password");

        
        const accessToken = JwtHandler.generateAccessToken({ id: user._id, email: user.email });
        const refreshToken = JwtHandler.generateRefreshToken({id: user._id, email: user.email });

 
        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        };
    }
}
