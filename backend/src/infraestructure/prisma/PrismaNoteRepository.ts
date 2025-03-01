import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { Note } from "../../domain/entities/Note";
import { prisma } from "./prismaClient";

export class PrismaNoteRepository implements INoteRepository {
  async create(note: Note): Promise<Note> {
    const created = await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        userId: note.userId!,
      },
    });
    return new Note(
      created.title,
      created.content,
      created.createdAt,
      created.updatedAt,
      created.userId,
      created.id
    );
  }

  async update(
    noteId: number,
    title: string,
    content: string,
    userId: number
  ): Promise<Note> {
    const updated = await prisma.note.update({
      where: { id: Number(noteId), userId },
      data: {
        title,
        content,
      },
    });
    return new Note(
      updated.title,
      updated.content,
      updated.createdAt,
      updated.updatedAt,
      updated.userId,
      updated.id
    );
  }

  async delete(noteId: number, userId: number): Promise<boolean> {
    const resp = await prisma.note.delete({
      where: { id: noteId, userId },
    });
    if (resp) return true;
    return false;
  }

  async findById(id: number): Promise<Note | null> {
    const found = await prisma.note.findFirst({
      where: { id },
    });
    if (!found) return null;
    return new Note(
      found.title,
      found.content,
      found.createdAt,
      found.updatedAt,
      found.userId,
      found.id
    );
  }

  async findMany(userId: string): Promise<Note[]> {
    const notes = await prisma.note.findMany({
      where: { user: { cognitoId: userId } },
      orderBy: { createdAt: "asc" },
    });
    return notes.map(
      (note) =>
        new Note(
          note.title,
          note.content,
          note.createdAt,
          note.updatedAt,
          note.userId,
          note.id
        )
    );
  }
}
