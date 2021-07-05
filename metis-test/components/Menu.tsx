import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Menu = () => (
  <>
    <div
      className="absolute -left-1/2 md:left-0 top-20 bottom-10 w-1/2 md:w-52 bg-gradient-to-b from-green-300 to-purple-300 rounded-br-2xl rounded-tr-2xl"
      id="menu"
    >
      <div className="flex w-full justify-center h-36 items-center">
        <button
          type="button"
          className="py-10 px-20 bg-black text-white rounded-2xl bg-opacity-75"
        >
          선택
        </button>
      </div>
    </div>
  </>
);

export default Menu;
