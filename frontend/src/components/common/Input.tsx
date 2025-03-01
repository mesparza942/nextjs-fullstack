import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  id: string;
  error?: string;
};
const Input = ({
  id,
  disabled,
  error,
  className = "",
  ...restProps
}: InputProps) => {
  const commonClass =
    "border border-black rounded-full py-2 px-4 hover:bg-opacity-80 focus:outline-nice-purple";
  return (
    <>
      <label htmlFor={id} className="hidden">
        {id}
      </label>
      <input
        id={id}
        className={`${commonClass} ${className}`}
        disabled={disabled}
        {...(restProps as ComponentProps<"input">)}
      />
      {error && <span className="text-red-600 text-sm ml-4">{error}</span>}
    </>
  );
};

export default Input;
