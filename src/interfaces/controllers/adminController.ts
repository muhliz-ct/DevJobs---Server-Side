import { Request, Response } from "express";
import { AdminLoginUseCase } from "../../application/use-cases/admin/adminLogin";
import { GetUsersUseCase } from "../../application/use-cases/admin/getUsers";


export class AdminController{
    static async login(req: Request, res:Response): Promise<void>{
        try {
            const {email, password} = req.body;

        if(!email || !password){
            res.status(400).json({message:"email and password are required."})
        }

        const result = await AdminLoginUseCase.execute(email,password)
        res.status(200).json({message:"admin logged successfully", data:result});

        } catch (error: any) {
            res.status(400).json({message: error.message})
        }
    }

    static async GetUsers(req:Request, res:Response): Promise<void>{
        try {
            const result = await GetUsersUseCase.execute()
            res.status(200).json({message:"data fetched successfully", data:result})
        } catch (error: any) {
            res.status(400).json({messsage: error.message})
        }
    }
}