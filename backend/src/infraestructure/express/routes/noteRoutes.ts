import { Router } from "express";
import { PrismaNoteRepository } from "../../prisma/PrismaNoteRepository";
import { PrismaUserRepository } from "../../prisma/PrismaUserRepository";
import { CreateNoteService } from "../../../application/services/CreateNote";
import { EditNoteService } from "../../../application/services/EditNote";
import { DeleteNoteService } from "../../../application/services/DeleteNote";
import { GetNoteService } from "../../../application/services/GetNote";
import { GetNotesService } from "../../../application/services/GetNotes";

const router = Router();
const noteRepository = new PrismaNoteRepository();
const userRepository = new PrismaUserRepository();

router.post("/", async (req, res) => {
  try {
    const createNoteService = new CreateNoteService(
      noteRepository,
      userRepository
    );
    const note = await createNoteService.execute({
      ...req.body,
      cognitoId: req.user?.username!,
    });
    res.status(201).json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editNoteService = new EditNoteService(noteRepository, userRepository);
    const note = await editNoteService.execute({
      noteId: req.params.id,
      ...req.body,
      cognitoId: req.user?.username,
    });
    res.status(200).json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteNoteService = new DeleteNoteService(
      noteRepository,
      userRepository
    );
    await deleteNoteService.execute({
      noteId: Number(req.params.id),
      cognitoId: req.user?.username!,
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getNoteService = new GetNoteService(noteRepository);
    const note = await getNoteService.execute({
      noteId: Number(req.params.id),
      userId: req.user?.username!,
    });
    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const getNotesService = new GetNotesService(noteRepository);
    const notes = await getNotesService.execute(req.user?.username!);
    res.status(200).json(notes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
