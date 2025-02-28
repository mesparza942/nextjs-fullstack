import { INoteRepository } from "../../domain/repositories/INoteRepository";

export class DeleteNoteService {
  constructor(private noteRepository: INoteRepository) {}

  async execute(data: { noteId: number; userId: number }): Promise<void> {
    this.noteRepository.delete(data.noteId, data.userId);
  }
}
