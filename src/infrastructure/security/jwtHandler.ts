import jwt from "jsonwebtoken";

export class JwtHandler {
    static generateAccessToken(payload: object): string {
        const secret = process.env.JWT_SECRET || "defaultSecretKey";
        const expiresIn = "15m"; 
        return jwt.sign(payload, secret, { expiresIn });
    }

    static generateRefreshToken(payload: object): string {
        const secret = process.env.JWT_SECRET || "defaultSecretKey" ;
        const expiresIn = "2d";
        return jwt.sign(payload, secret, {expiresIn});
    }
}
