import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Note } from "../../domain/entities/Note";

export class EditNoteService {
  constructor(
    private noteRepository: INoteRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: {
    noteId: number;
    title: string;
    content: string;
    userId: string;
  }): Promise<Note> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) throw new Error("User not found");
    const noteToUpdate = await this.noteRepository.findById(
      data.noteId,
      user.cognitoId
    );
    if (!noteToUpdate) throw new Error("Note not found");
    const updatedNote = new Note(
      data.title,
      data.content,
      user.id!,
      noteToUpdate?.createdAt,
      new Date(),
      noteToUpdate.id
    );
    return this.noteRepository.update(updatedNote);
  }
}
