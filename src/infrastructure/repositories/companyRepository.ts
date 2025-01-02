import CompanyModel, {ICompany} from "../database/models/companyModel";


class ComponyRepository{
    static async register(company: ICompany): Promise<ICompany>{
        const newCompany = new CompanyModel(company);
        return await newCompany.save();
    }

    static async findComponyByEmail(email: string): Promise<ICompany | null>{
        return CompanyModel.findOne({email});
    }

    static async updateCompanyOtp(email: string, otp: string, otpExpiry: string): Promise<void>{
        await CompanyModel.updateOne({email},{otp, otpExpiry});
    }
}







export default ComponyRepository;