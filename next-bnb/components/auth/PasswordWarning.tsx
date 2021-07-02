import React from "react";
import RedXIcon from "../../public/static/svg/X-icon.svg";
import GreenCheckIcon from "../../public/static/svg/check-icon.svg";

interface Props {
  isValid: boolean;
  text: string;
}

const PasswordWarning: React.FC<Props> = ({ isValid, text }) => {
  return (
    <div
      className={`flex items-center ${
        isValid ? "text-red-500" : "text-green-500"
      }`}
    >
      {isValid ? (
        <RedXIcon className="mr-2" />
      ) : (
        <GreenCheckIcon className="mr-2" />
      )}
      {text}
    </div>
  );
};

export default PasswordWarning;
