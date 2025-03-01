"use client";
import { useState, useEffect } from "react";
import { Modal, Loading } from "../../common";
import { useBackendFetch } from "@/hooks/useBackendFetch";
import type { Note, EditNoteBody } from "@/types/api-schemas";
import NoteForm, { NoteFormValues } from "./NoteForm";

interface EditNotesProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
  onDeleteNote: () => void;
  onRefetchNotes: () => Promise<void>;
}
const EditNote = ({
  note,
  isOpen,
  onClose,
  onDeleteNote,
  onRefetchNotes,
}: EditNotesProps) => {
  const [editNoteFormVals, setEditNoteFormVals] = useState<NoteFormValues>({
    title: "",
    content: "",
  });

  const { fetchData: editNote, loading } = useBackendFetch<Note, EditNoteBody>({
    api: `/notes/${note.id}`,
    method: "PUT",
  });

  const handleFormChange = (values: NoteFormValues) => {
    setEditNoteFormVals(values);
  };

  const handleSubmit = async () => {
    const editNoteBody: EditNoteBody = {
      ...editNoteFormVals,
      id: note.id,
    };
    await editNote(editNoteBody);
    onClose();
    await onRefetchNotes();
  };

  const handleDeleteNote = () => {
    onDeleteNote();
  };

  return (
    <>
      {loading && <Loading className="fixed top-0 left-0" />}
      <Modal isOpen={isOpen} onClose={onClose}>
        <NoteForm
          formTitle={`Edit Note ${note.id}`}
          actionType="edit"
          loading={loading}
          note={note}
          onCancel={onClose}
          onDeleteNote={handleDeleteNote}
          onFormChange={handleFormChange}
          submitAction={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default EditNote;
