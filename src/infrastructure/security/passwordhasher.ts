import bcrypt from "bcrypt";

export class PasswordHasher {
    static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
}
