import  UserRepository  from "../../../infrastructure/repositories/userRepository";
import { AuthService } from "../../../domain/services/authService";
import { JwtHandler } from "../../../infrastructure/security/jwtHandler";
import { IUser } from "src/infrastructure/database/models/userModel";



export class GoogleLoginUseCase {
    static async execute(fullName: string, email: string, phoneNumber: string | null): Promise<{ accessToken: string; refreshToken: string; user: object }> {
        
        const user = await UserRepository.findUserByEmail(email);
        if (user){
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
        else{
            const userData = {fullName, email, phoneNumber} as IUser;
            const user = await UserRepository.createUserGoogle(userData);
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
}
