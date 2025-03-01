import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByCognitoId(cognitoId: string): Promise<User | null>;
}
