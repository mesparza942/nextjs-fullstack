import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  btnText?: string;
  icon?: React.ReactNode;
};

const Button = ({
  btnText,
  icon,
  children,
  disabled,
  className = "",
  ...restProps
}: ButtonProps) => {
  const commonClass = disabled
    ? "bg-nice-purple rounded-full py-2 px-4 hover:bg-opacity-80 font-semibold text-white bg-opacity-80 hover:cursor-not-allowed"
    : "bg-nice-purple rounded-full py-2 px-4 hover:bg-opacity-80 font-semibold text-white";
  return (
    <button
      className={`${commonClass} focus:outline-none ${className}`}
      disabled={disabled}
      {...(restProps as ComponentProps<"button">)}
    >
      {btnText ?? children}
      {icon}
    </button>
  );
};

export default Button;
