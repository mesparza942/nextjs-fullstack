"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { UserProvider } from "@/context/UserContext";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  if (session?.expires)
    return (
      <SessionProvider session={session}>
        <UserProvider>{children}</UserProvider>
      </SessionProvider>
    );
}
