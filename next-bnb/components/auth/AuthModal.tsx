import React from "react";
import { RootState, useSelector } from "../../store";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

interface Props {
  closeModal: () => void;
}

const AuthModal: React.FC<Props> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <div style={{ zIndex: 12 }}>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </div>
  );
};

export default AuthModal;
