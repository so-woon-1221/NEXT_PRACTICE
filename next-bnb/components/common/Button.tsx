import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <button
      className="w-full h-12 border-0 rounded bg-gray-400 text-white font-bold outline-none cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
