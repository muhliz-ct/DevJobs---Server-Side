import UserModel, { IUser } from "../database/models/userModel";

class UserRepository {
    static async createUser(user: IUser): Promise<IUser> { 
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    static async findUserByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email });
    }

    static async updateUserOtp(email: string, otp: string, otpExpiry: string): Promise<void> {
        await UserModel.updateOne({ email }, { otp, otpExpiry });
    }

    static async updateUserPassword(email: string, password: string): Promise<void> {
        await UserModel.updateOne({ email }, { password });
    }

    static async userData(): Promise<{}> {
        const result = await UserModel.find();
        return result
    }

    static async createUserGoogle(user:IUser): Promise<IUser>{
        const newUser = new UserModel(user);
        return await newUser.save();
        

    }
}

export default UserRepository;  

