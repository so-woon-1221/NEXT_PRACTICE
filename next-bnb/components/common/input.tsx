import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element
}

const Input:React.FC<IProps> = ({ icon, ...props }) => {
  return (
    <div>
      {icon ? (
        <input
          className="relative w-full h-12 border border-gray-300 rounded outline-none focus:border-indigo-500 pr-12 pl-3"
          {...props}
        />
      ) : (
        <input
          className="relative w-full h-12 border border-gray-300 rounded outline-none focus:border-indigo-500 px-3"
          {...props}
        />
      ) }
      <div className="absolute top-0 right-3 h-12 flex items-center w-7">{icon}</div>
    </div>
  );
};

export default Input;
