import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class GetUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: { userId: number }): Promise<User | null> {
    return this.userRepository.findById(data.userId);
  }
}
