import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: { name: string; cognitoId: string }): Promise<User> {
    const newUser = new User(data.name, data.cognitoId, new Date(), new Date());
    return this.userRepository.create(newUser);
  }
}
