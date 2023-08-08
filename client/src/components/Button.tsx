import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...rest
}) => {
  const buttonClasses =
    variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-500"
      : "bg-gray-600 hover:bg-gray-500";

  return (
    <button
      {...rest}
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${buttonClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;
