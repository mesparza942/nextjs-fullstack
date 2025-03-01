import { INoteRepository } from "../../domain/repositories/INoteRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class DeleteNoteService {
  constructor(
    private noteRepository: INoteRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: { noteId: number; cognitoId: string }): Promise<void> {
    const user = await this.userRepository.findByCognitoId(data.cognitoId);
    if (!user) throw new Error("User associated to this Note not found.");
    this.noteRepository.delete(data.noteId, user.id!);
  }
}
