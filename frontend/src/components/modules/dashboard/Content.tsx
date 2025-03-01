import React from "react";
import { Button } from "@/components/common";
import NoteList from "../notes/NoteList";
import CreateNote from "../notes/CreateNote";
import EditNote from "../notes/EditNote";
import DeleteNote from "../notes/DeleteNote";
import { useBackendFetch } from "@/hooks/useBackendFetch";
import type { Note } from "@/types/api-schemas";

const MainContent = ({ userName }: { userName: string }) => {
  const [modalEditNote, setModalEditNote] = React.useState(false);
  const [modalCreateNote, setModalCreateNote] = React.useState(false);
  const [modalDeleteNote, setModalDeleteNote] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState<Note>();
  const [notes, setNotes] = React.useState<Note[]>([]);

  const {
    fetchData: getNotes,
    loading,
    data,
  } = useBackendFetch<Note[], null>({ api: "/notes", method: "GET" });

  React.useEffect(() => {
    if (!notes.length) {
      getNotes();
    }
  }, []);

  React.useEffect(() => {
    if (data?.length) {
      setNotes(data);
    }
  }, [data]);

  const handleCreateNote = () => {
    setModalEditNote(false);
    setModalDeleteNote(false);
    setModalCreateNote(true);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note);
    setModalDeleteNote(false);
    setModalCreateNote(false);
    setModalEditNote(true);
  };

  const handleDeleteNote = () => {
    console.log("called");
    console.log(notes);

    setModalCreateNote(false);
    setModalEditNote(false);
    setModalDeleteNote(true);
  };

  const handleCloseCreateModal = () => setModalCreateNote(false);
  const handleCloseEditModal = () => setModalEditNote(false);
  const handleCloseDeleteModal = () => setModalDeleteNote(false);

  const handleRefetchNotes = async () => {
    console.log("called!");

    await getNotes();
  };
  return (
    <main className="p-4">
      <div className="flex">
        <h1 className="text-3xl font-semibold">
          Hello {userName}, let&apos;s create Notes!
        </h1>
        <Button className="ml-4" onClick={handleCreateNote}>
          Create Note
        </Button>
      </div>
      <NoteList onEditNote={handleEditNote} notes={notes} loading={loading} />
      <CreateNote
        key="create-note-modal"
        isOpen={modalCreateNote}
        onClose={handleCloseCreateModal}
        onRefetchNotes={handleRefetchNotes}
      />
      {currentNote && (
        <EditNote
          key="edit-note-modal"
          isOpen={modalEditNote}
          note={currentNote!}
          onClose={handleCloseEditModal}
          onDeleteNote={handleDeleteNote}
          onRefetchNotes={handleRefetchNotes}
        />
      )}
      {currentNote && (
        <DeleteNote
          key="delete-note-modal"
          isOpen={modalDeleteNote}
          note={currentNote}
          onClose={handleCloseDeleteModal}
          onRefetchNotes={handleRefetchNotes}
        />
      )}
    </main>
  );
};

export default MainContent;
