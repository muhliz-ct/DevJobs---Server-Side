import ComponyRepository from "../../../infrastructure/repositories/companyRepository";
import { AuthService } from "../../../domain/services/authService";
import { JwtHandler } from "../../../infrastructure/security/jwtHandler";

export class LoginCompanyUseCase {
    static async execute(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; company: object }> {
        
        const company = await ComponyRepository.findComponyByEmail(email);
        if (!company) throw new Error("Invalid email or password");

       
        const isPasswordValid = await AuthService.verifyPassword(company.password, password);
        if (!isPasswordValid) throw new Error("Invalid email or password");

        
        const accessToken = JwtHandler.generateAccessToken({ id: company._id, email: company.email });
        const refreshToken = JwtHandler.generateRefreshToken({id: company._id, email: company.email})

 
        return {
            accessToken,
            refreshToken,
            company: {
                id: company._id,
                fullName: company.companyname,
                email: company.email,
            },
        };
    }
}
