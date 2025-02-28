import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class DeleteNoteService {
  constructor(
    private noteRepository: INoteRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: { noteId: number; userId: string }): Promise<void> {
    const user = await this.userRepository.findById(data.userId);
    if (!user) throw new Error("User not found.");
    const note = await this.noteRepository.findById(
      data.noteId,
      user.cognitoId
    );
    if (!note) throw new Error("Note associated to User not found.");
    this.noteRepository.delete(note);
  }
}
