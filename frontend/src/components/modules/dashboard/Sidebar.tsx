import React from "react";
import Image from "next/image";
import notesImg from "@/assets/notes-img.png";
import LogoutButton from "../authentication/LogoutButton";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-400 h-screen w-64 p-5 shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <Image src={notesImg} alt="Notes Img" width={80} height={80} />
      </div>
      <div className="w-full bg-black h-[2px] rounded-full" />
      <div className="my-8 flex justify-center">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
