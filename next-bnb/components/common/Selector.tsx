import React from "react";
import { useSelector } from "../../store";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  value?: string;
  isValid?: boolean;
}

const Selector: React.FC<IProps> = ({ options = [], isValid, ...props }) => {
  const validateMode = useSelector((state) => state.common.validateMode);
  return (
    <div className="w-full h-12">
      <select
        {...props}
        className={`w-full h-full bg-white border border-gray-300 px-3 rounded outline-none select-custom focus:border-indigo-300 ${
          validateMode && (isValid ? "border-green-500" : "border-gray-300")
        }`}
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
