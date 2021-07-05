import React, { useState } from "react";
import Modal from "./Modal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 items-center block w-full h-20 bg-green-300 shadow-md md:flex">
      <div className="relative flex items-center justify-center px-10 h-20 z-10 md:w-auto bg-green-300">
        <button
          type="button"
          className="absolute right-10 md:hidden z-10"
          onClick={() => {
            const menu = document.getElementById("navMenu");
            if (menu) {
              menu.classList.toggle("show");
            }
          }}
        >
          메뉴
        </button>
        <button
          type="button"
          className="absolute left-10 md:hidden z-10"
          onClick={() => {
            const menu = document.getElementById("menu");
            if (menu) {
              menu.classList.toggle("open");
            }
          }}
        >
          메뉴
        </button>
        LOGO
      </div>
      <div
        className="flex flex-col z-0 absolute h-auto -top-32 w-full items-center bg-green-300
      md:flex-row md:relative md:top-0"
        id="navMenu"
      >
        <h3 className="mb-3 text-xl font-bold md:mr-5 md:mb-0">MENU1</h3>
        <h3 className="mb-3 text-xl font-bold md:mr-5 md:mb-0">MENU2</h3>
        <h3 className="mb-3 text-xl font-bold md:mr-5 md:mb-0">MENU3</h3>
        <h3 className="pb-3 text-xl font-bold md:mr-5 md:mb-0 md:pb-0">
          MENU4
        </h3>
        <div className="flex-grow pb-3 md:text-right md:pr-10 md:pb-0">
          <button
            type="button"
            className="px-5 md:py-3 md:bg-black rounded-2xl md:text-white md:bg-opacity-50 font-bold text-xl"
            onClick={() => setIsOpen(true)}
          >
            로그인
          </button>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
