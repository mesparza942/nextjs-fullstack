import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Note } from "../../domain/entities/Note";

export class EditNoteService {
  constructor(
    private noteRepository: INoteRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: {
    cognitoId: string;
    noteId: number;
    title: string;
    content: string;
  }): Promise<Note> {
    const user = await this.userRepository.findByCognitoId(data.cognitoId);
    if (!user) throw new Error("User associated to this Note not found.");
    return this.noteRepository.update(
      data.noteId,
      data.title,
      data.content,
      user.id!
    );
  }
}
