"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/common/Button";
import Loading from "@/components/common/LoadingBar";

const LoginButton = () => {
  const [loading, setLoading] = useState(false);

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
