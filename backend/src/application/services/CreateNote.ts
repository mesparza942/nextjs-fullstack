import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Note } from "../../domain/entities/Note";

export class CreateNoteService {
  constructor(
    private noteRepository: INoteRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: {
    title: string;
    content: string;
    userId: string;
  }): Promise<Note> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) throw new Error("User not found.");
    const newNote = new Note(
      data.title,
      data.content,
      user.id!,
      new Date(),
      new Date()
    );
    return this.noteRepository.create(newNote);
  }
}
