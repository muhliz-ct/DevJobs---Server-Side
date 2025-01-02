import bcrypt from "bcrypt";

export class AuthService {
    static async verifyPassword(storedPassword?: string, providedPassword?: string): Promise<boolean> {
        if (!storedPassword || !providedPassword) {
            throw new Error("Both storedPassword and providedPassword must be provided.");
        }
        return await bcrypt.compare(storedPassword, providedPassword);
    }
}
