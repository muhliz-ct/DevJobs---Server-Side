import mongoose, {Document, Model} from "mongoose";
import { UserSchema } from "../schemas/userSchema";

export interface IUser extends Document {
    fullName: string,
    phoneNumber?: string,
    email: string,
    password?: string
    otp?: string;
    otpExpiry?: Date;

}

const UserModel: Model<IUser> = mongoose.model<IUser>('User',UserSchema);

export default UserModel;