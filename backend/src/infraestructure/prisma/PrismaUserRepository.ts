import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { prisma } from "./prismaClient";

export class PrismaUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await prisma.user.upsert({
      where: { cognitoId: user.cognitoId },
      update: {},
      create: {
        name: user.name,
        cognitoId: user.cognitoId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    return new User(
      created.name,
      created.cognitoId,
      created.createdAt,
      created.updatedAt,
      created.id
    );
  }

  async findByCognitoId(id: string): Promise<User | null> {
    const found = await prisma.user.findUnique({ where: { cognitoId: id } });
    if (!found) return null;
    return new User(
      found.name,
      found.cognitoId,
      found.createdAt,
      found.updatedAt,
      found.id
    );
  }
}
