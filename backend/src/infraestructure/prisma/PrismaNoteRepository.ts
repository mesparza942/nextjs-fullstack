import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { Note } from "../../domain/entities/Note";
import { prisma } from "./prismaClient";

export class PrismaNoteRepository implements INoteRepository {
  async create(note: Note): Promise<Note> {
    const created = await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        userId: note.userId,
      },
    });
    return new Note(
      created.title,
      created.content,
      created.userId,
      created.createdAt,
      created.updatedAt,
      created.id
    );
  }

  async update(note: Note): Promise<Note> {
    const updated = await prisma.note.update({
      where: { id: note.id },
      data: {
        title: note.title,
        content: note.content,
      },
    });
    return new Note(
      updated.title,
      updated.content,
      updated.userId,
      updated.createdAt,
      updated.updatedAt,
      updated.id
    );
  }

  async delete(noteId: number, userId: number): Promise<void> {
    await prisma.note.delete({ where: { id: noteId, userId } });
  }

  async findById(id: number): Promise<Note | null> {
    const found = await prisma.note.findUnique({ where: { id } });
    if (!found) return null;
    return new Note(
      found.title,
      found.content,
      found.userId,
      found.createdAt,
      found.updatedAt,
      found.id
    );
  }

  async findMany(): Promise<Note[]> {
    const notes = await prisma.note.findMany();
    return notes.map(
      (note) =>
        new Note(
          note.title,
          note.content,
          note.userId,
          note.createdAt,
          note.updatedAt,
          note.id
        )
    );
  }
}
