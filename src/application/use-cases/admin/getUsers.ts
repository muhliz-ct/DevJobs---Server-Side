import UserRepository from "../../../infrastructure/repositories/userRepository";

export class GetUsersUseCase{
    static async execute(): Promise<{data: object}>{
        const result = await UserRepository.userData();
        return{
            data: result
        }
    }
}