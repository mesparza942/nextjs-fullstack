import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { Note } from "../../domain/entities/Note";

export class GetNoteService {
  constructor(private noteRepository: INoteRepository) {}

  async execute(data: {
    noteId: number;
    userId: string;
  }): Promise<Note | null> {
    return this.noteRepository.findById(data.noteId, data.userId);
  }
}
