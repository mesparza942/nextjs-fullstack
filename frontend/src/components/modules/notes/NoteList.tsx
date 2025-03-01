import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { Loading } from "@/components/common";
import type { Note } from "@/types/api-schemas";
import pencilImg from "@/assets/pencil.png";
import "./note.css";

interface NoteListProps {
  notes: Note[];
  loading: boolean;
  onEditNote: (note: Note) => void;
}
const NoteList = ({ notes, loading, onEditNote }: NoteListProps) => {
  const dateFormat = (date: Date): string => {
    return dayjs(date).format("DD-MMM-YYYY HH:mm");
  };

  return (
    <>
      {loading && <Loading className="fixed top-0 left-0" />}
      <div className="flex p-20 flex-wrap gap-12">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative note-card p-8 bg-nice-purple text-black shadow-lg shadow-black hover:opacity-80 w-[350px] flex flex-col justify-between"
            title="Edit Note"
            onClick={() => {
              onEditNote(note);
            }}
          >
            <div>
              <Image
                className="edit-note"
                src={pencilImg}
                alt="Edit icon"
                width={20}
                height={20}
              />
              <h1 className="font-bold flex items-center">
                <span className="text-4xl border-r-2 border-black mr-4 pr-4">
                  {note.id}
                </span>
                <span className="text-2xl">{note.title}</span>
              </h1>
              <div className="my-4">{note.content}</div>
            </div>
            <div>
              <div className="w-full bg-black h-[2px] rounded-full" />
              <div className="mt-4">
                Last Updated: {dateFormat(note.updatedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NoteList;
