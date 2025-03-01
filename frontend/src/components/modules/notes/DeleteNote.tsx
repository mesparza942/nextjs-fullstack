"use client";
import { Modal, Loading, Button } from "../../common";
import { useBackendFetch } from "@/hooks/useBackendFetch";
import type { Note } from "@/types/api-schemas";

interface DeleteNoteProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
  onRefetchNotes: () => Promise<void>;
}
const DeleteNote = ({
  note,
  isOpen,
  onClose,
  onRefetchNotes,
}: DeleteNoteProps) => {
  const { fetchData: deleteNote, loading } = useBackendFetch<Note, null>({
    api: `/notes/${note.id}`,
    method: "DELETE",
  });

  const handleDelete = async () => {
    await deleteNote();
    onClose();
    await onRefetchNotes();
  };

  return (
    <>
      {loading && <Loading className="fixed top-0 left-0" />}
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1>Are you sure you want to delete Note: {note.id}?</h1>
        <div className="flex gap-4 my-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete} disabled={loading}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteNote;
