import React from "react";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  value?: string;
}

const Selector: React.FC<IProps> = ({ options = [], ...props }) => {
  return (
    <div className="w-full h-12">
      <select
        {...props}
        className="w-full h-full bg-white border border-gray-300 px-3 rounded outline-none select-custom focus:border-indigo-300"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
