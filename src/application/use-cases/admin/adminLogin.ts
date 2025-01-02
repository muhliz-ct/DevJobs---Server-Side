import { JwtHandler } from "../../../infrastructure/security/jwtHandler";
import AdminRepository from "../../../infrastructure/repositories/adminRepository";

export class AdminLoginUseCase{
    static async execute(email:string, password:string): Promise <{accessToken:string; refreshToken:string; admin:object}>{
        const admin = await AdminRepository.findAdminByEmail(email);
        if(! admin) throw new Error("Invalid email or password");

        if(admin.password != password) throw new Error("Invalid email or password");

        const accessToken = JwtHandler.generateAccessToken({id: admin._id, email: admin.email});
        const refreshToken = JwtHandler.generateRefreshToken({id: admin._id, email: admin.email})

        return{
            accessToken,
            refreshToken,
            admin:{
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email
            }
        }
    }
}