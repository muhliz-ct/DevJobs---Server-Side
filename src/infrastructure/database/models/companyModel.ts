import mongoose, {Document, Model} from "mongoose"
import { CompanySchema } from "../schemas/companySchema"


export interface ICompany extends Document {
    companyname: string,
    companyphone: string,
    email: string,
    password: string,
    otp?: string,
    otpExpiry?: Date
}

const CompanyModel: Model<ICompany> = mongoose.model<ICompany>('Company', CompanySchema);
export default CompanyModel;