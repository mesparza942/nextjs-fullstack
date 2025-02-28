import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(cognitoId: string): Promise<User | null>;
}
