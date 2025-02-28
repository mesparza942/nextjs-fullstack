import React from "react";
import Image from "next/image";
import logo from "@/assets/ardant_logo.png";

const Logo: React.FC = () => {
  return (
    <div className="w-full h-full bg-logo-bg animate-logo flex items-center justify-center relative">
      <Image
        src={logo}
        alt="Logo"
        className="object-contain"
        width={350}
        height={350}
      />
    </div>
  );
};

export default Logo;
