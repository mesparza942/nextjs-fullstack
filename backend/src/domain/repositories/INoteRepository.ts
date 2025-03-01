import { Note } from "../entities/Note";

export interface INoteRepository {
  create(note: Note): Promise<Note>;
  update(
    noteId: number,
    title: string,
    content: string,
    userId: number
  ): Promise<Note>;
  delete(noteId: number, userId: number): Promise<boolean>;
  findById(id: number, userId: string): Promise<Note | null>;
  findMany(userId: string): Promise<Note[]>;
}
