import { Note } from "../entities/Note";

export interface INoteRepository {
  create(note: Note): Promise<Note>;
  update(note: Note): Promise<Note>;
  delete(noteId: number, userId: number): Promise<void>;
  findById(id: number): Promise<Note | null>;
  findMany(): Promise<Note[]>;
}
