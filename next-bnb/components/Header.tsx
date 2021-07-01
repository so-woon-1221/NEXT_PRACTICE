import React, { useState } from "react";
import Link from "next/link";
import AirbnbLogo from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import useModal from "../hooks/useModal";
import SignUpModal from "./auth/SignUpModal";

const Header: React.FC = () => {
  const { openModal, ModalPortal } = useModal();

  return (
    <div className="sticky top-0 w-full h-20 flex justify-between items-center px-20 bg-white">
      <Link href="/">
        <a className="flex items-center">
          <AirbnbLogo className="mr-2" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      <div>
        <button
          type="button"
          className="h-12 mr-2 px-4 border-0 rounded-2xl bg-white cursor-pointer outline-none hover:bg-gray-200"
          onClick={openModal}
        >회원가입
        </button>
        <button
          type="button"
          className="h-12 px-4 border-0 rounded-2xl bg-white cursor-pointer outline-none shadow hover:shadow-md"
        >
          로그인
        </button>
      </div>
      {/*{modalOpened && (*/}
      {/*  // <div className="w-full h-full flex justify-center items-center fixed top-0 left-0">*/}
      {/*  //   <div*/}
      {/*  //     role="presentation"*/}
      {/*  //     onClick={() => setModalOpened(false)}*/}
      {/*  //     className="absolute w-full h-full bg-black bg-opacity-75 z-10"*/}
      {/*  //   />*/}
      {/*  //   <div className="w-96 h-96 bg-white z-20" />*/}
      {/*  // </div>*/}
      {/*)}*/}
      <ModalPortal>
        <SignUpModal />
      </ModalPortal>
    </div>
  );
};

export default Header;
