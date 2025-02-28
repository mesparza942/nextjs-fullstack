import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {};
const Input = ({ disabled, className = "", ...restProps }: InputProps) => {
  const commonClass =
    "border border-black rounded-full py-2 px-4 hover:bg-opacity-80 focus:outline-nice-purple";
  return (
    <input
      className={`${commonClass} ${className}`}
      disabled={disabled}
      {...(restProps as ComponentProps<"input">)}
    />
  );
};

export default Input;
