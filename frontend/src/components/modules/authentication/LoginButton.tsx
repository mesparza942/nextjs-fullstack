"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import Button from "@/components/shared/Button";
import Loading from "@/components/shared/LoadingBar";

const LoginButton = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    console.log("Status:", status);
    console.log("Session:", session);
    if (
      (status === "authenticated" || session) &&
      !pathname.includes("/login")
    ) {
      redirect("/dashboard");
    }
  }, [status, pathname, session]);

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  const handleLoginClick = async () => {
    setLoading(true);
    try {
      signIn("cognito", {
        callbackUrl: `/dashboard`,
        prompt: "login",
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading className="fixed top-0 left-0" />}
      <Button onClick={handleLoginClick} btnText="Login" disabled={loading} />
    </>
  );
};

export default LoginButton;
