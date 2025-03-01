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
    cognitoId: string;
  }): Promise<Note> {
    const user = await this.userRepository.findByCognitoId(data.cognitoId);
    if (!user) throw new Error("User not found.");
    const newNote = new Note(
      data.title,
      data.content,
      new Date(),
      new Date(),
      user.id!
    );
    return this.noteRepository.create(newNote);
  }
}
