"use client";
import { useState } from "react";
import { Modal, Loading } from "../../common";
import { useBackendFetch } from "@/hooks/useBackendFetch";
import type { Note, CreateNoteBody } from "@/types/api-schemas";
import NoteForm, { NoteFormValues } from "./NoteForm";

const CreateNote = ({
  isOpen,
  onClose,
  onRefetchNotes,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRefetchNotes: () => Promise<void>;
}) => {
  const [createNoteFormVals, setCreateNoteFormVals] = useState<NoteFormValues>({
    title: "",
    content: "",
  });

  const { fetchData: createNote, loading } = useBackendFetch<
    Note,
    CreateNoteBody
  >({ api: "/notes", method: "POST" });

  const handleFormChange = (values: NoteFormValues) => {
    setCreateNoteFormVals(values);
  };

  const handleSubmit = async () => {
    await createNote(createNoteFormVals);
    onClose();
    await onRefetchNotes();
  };

  return (
    <>
      {loading && <Loading className="fixed top-0 left-0" />}
      <Modal isOpen={isOpen} onClose={onClose}>
        <NoteForm
          loading={loading}
          formTitle="New Note"
          actionType="create"
          onCancel={onClose}
          onFormChange={handleFormChange}
          submitAction={handleSubmit}
        />
      </Modal>
    </>
  );
};

export default CreateNote;
