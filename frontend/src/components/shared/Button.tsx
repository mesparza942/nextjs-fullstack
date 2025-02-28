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
    ? "bg-greenFav rounded-full py-2 px-4 hover:bg-opacity-80 font-semibold text-white opacity-45"
    : "bg-greenFav rounded-full py-2 px-4 hover:bg-opacity-80 font-semibold text-white";
  return (
    <button
      className={`${commonClass} ${className}`}
      {...(restProps as ComponentProps<"button">)}
    >
      {btnText ?? children}
      {icon}
    </button>
  );
};

export default Button;
