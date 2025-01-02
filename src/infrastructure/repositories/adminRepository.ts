import AdminModel,{IAdmin} from "../database/models/adminModel";

class AdminRepository{
    static async findAdminByEmail(email:string): Promise<IAdmin | null> {
        return await AdminModel.findOne({email})
    }
}

export default AdminRepository