import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class GetUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: { cognitoId: string }): Promise<User | null> {
    return this.userRepository.findById(data.cognitoId);
  }
}
