import { Note } from "../entities/Note";

export interface INoteRepository {
  create(note: Note): Promise<Note>;
  update(note: Note): Promise<Note>;
  delete(note: Note): Promise<boolean>;
  findById(id: number, userId: string): Promise<Note | null>;
  findMany(userId: string): Promise<Note[]>;
}
