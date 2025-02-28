"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import Logo from "@/components/modules/authentication/Logo";
import LoginButton from "@/components/modules/authentication/LoginButton";
import { Loading } from "../common";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (
      (status === "authenticated" || session) &&
      !pathname.includes("/login")
    ) {
      redirect("/dashboard");
    }
  }, [status, pathname, session]);

  return (
    <>
      {status === "loading" && <Loading className="fixed top-0 left-0" />}
      <div className="xl:min-h-screen flex flex-col xl:flex-row">
        <div className="w-full xl:w-3/5 relative flex items-center justify-center bg-gray-100">
          <Logo />
        </div>
        <div className="w-full xl:w-2/5 bg-dark flex flex-col items-center justify-center">
          <h1 className="mt-20 xl:mt-0 text-5xl font-bold mb-4 text-primary">
            Welcome
          </h1>
          <span className="text-xl mb-4 italic">Notes to the rescue</span>
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
