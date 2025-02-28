import React from "react";
import Logo from "@/components/modules/authentication/Logo";
import LoginButton from "@/components/modules/authentication/LoginButton";

const LoginPage = () => {
  return (
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
  );
};

export default LoginPage;
