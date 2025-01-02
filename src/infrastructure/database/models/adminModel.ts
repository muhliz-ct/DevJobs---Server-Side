import mongoose,{Document, Model} from "mongoose";
import { AdminSchema } from "../schemas/adminSchema";



export interface IAdmin extends Document {
    fullName: string,
    email: string,
    password: string
}

const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>('Admin',AdminSchema)
export default AdminModel