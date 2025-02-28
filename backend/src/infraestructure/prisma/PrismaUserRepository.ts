import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { prisma } from "./prismaClient";

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        cognitoId: user.cognitoId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    return new User(
      created.id,
      created.name,
      created.cognitoId,
      created.createdAt,
      created.updatedAt
    );
  }

  async findById(id: number): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { id } });
    if (!found) return null;
    return new User(
      found.id,
      found.name,
      found.cognitoId,
      found.createdAt,
      found.updatedAt
    );
  }
}
