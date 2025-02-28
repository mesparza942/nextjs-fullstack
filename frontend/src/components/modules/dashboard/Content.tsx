import React from "react";

const MainContent = ({ userName }: { userName: string }) => {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-semibold">
        Hello {userName}, let&apos;s create Notes!
      </h1>
    </main>
  );
};

export default MainContent;
