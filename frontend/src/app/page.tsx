"use client";
import { Loading } from "@/components/common";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      redirect("/login");
    } else {
      redirect("/dashboard");
    }
  }, []);

  return <Loading className="fixed top-0 left-0" />;
}
