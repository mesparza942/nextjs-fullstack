"use client";
import { useEffect, useState } from "react";
import { Input, Button } from "../../common";
import type { Note, CreateNoteBody, EditNoteBody } from "@/types/api-schemas";

export interface NoteFormValues {
  title: string;
  content: string;
}
interface NoteFormProps {
  loading: boolean;
  formTitle: string;
  actionType: "create" | "edit";
  note?: Note;
  onCancel: () => void;
  onDeleteNote?: () => void;
  onFormChange: (values: NoteFormValues) => void;
  submitAction: (note: CreateNoteBody | EditNoteBody) => Promise<void>;
}
const NoteForm = ({
  loading,
  formTitle,
  actionType,
  note,
  onCancel,
  onDeleteNote,
  onFormChange,
  submitAction,
}: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onFormChange({ title: e.target.value, content });
  };
  const handleTitleBlur = () => {
    if (!title) {
      setTitleError("Note title is required");
    } else {
      setTitleError("");
    }
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    onFormChange({ title, content: e.target.value });
  };

  const handleSubmit = async () => {
    await submitAction({ title, content });
  };

  useEffect(() => {
    if (note && actionType === "edit") {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note, actionType]);

  return (
    <>
      <h1 className="text-3xl font-bold">{formTitle}</h1>
      <form className="flex flex-col gap-3">
        <Input
          id="note-title"
          placeholder="Enter Note Title"
          required
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          error={titleError}
        />
        <Input
          id="note-content"
          placeholder="Enter Note Content"
          value={content}
          onChange={handleContentChange}
        />
        <div className="flex my-2 gap-4">
          <Button
            disabled={loading}
            onClick={onCancel}
            className="bg-white border border-black !text-black"
          >
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            Save
          </Button>
          {actionType === "edit" && onDeleteNote && (
            <Button
              disabled={loading}
              onClick={onDeleteNote}
              className="bg-yellow-300 !text-black"
            >
              Delete Note
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default NoteForm;
