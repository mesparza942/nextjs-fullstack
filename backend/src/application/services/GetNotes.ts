import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { Note } from "../../domain/entities/Note";

export class GetNotesService {
  constructor(private noteRepository: INoteRepository) {}

  async execute(): Promise<Note[]> {
    return this.noteRepository.findMany();
  }
}
