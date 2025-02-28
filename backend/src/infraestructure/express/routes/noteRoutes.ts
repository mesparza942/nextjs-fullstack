import { Router } from "express";
import { PrismaNoteRepository } from "../../prisma/PrismaNoteRepository";
import { CreateNoteService } from "../../../application/services/CreateNote";
import { EditNoteService } from "../../../application/services/EditNote";
import { DeleteNoteService } from "../../../application/services/DeleteNote";
import { GetNoteService } from "../../../application/services/GetNote";
import { GetNotesService } from "../../../application/services/GetNotes";

const router = Router();
const noteRepository = new PrismaNoteRepository();

router.post("/", async (req, res) => {
  try {
    const createNoteService = new CreateNoteService(noteRepository);
    const note = await createNoteService.execute(req.body);
    res.status(201).json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editNoteService = new EditNoteService(noteRepository);
    // Combine the note ID from params with body data
    const note = await editNoteService.execute({
      id: req.params.id,
      ...req.body,
    });
    res.status(200).json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteNoteService = new DeleteNoteService(noteRepository);
    await deleteNoteService.execute({
      noteId: Number(req.params.id),
      userId: req.user?.id,
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

router.get("/", async (_req, res) => {
  try {
    const getNotesService = new GetNotesService(noteRepository);
    const notes = await getNotesService.execute();
    res.status(200).json(notes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
