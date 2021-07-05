import React, { useEffect } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Modal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen) {
      const thisNode = document.getElementById("modal");
      if (thisNode) {
        thisNode.classList.add("modal");
      }
    } else {
      const thisNode = document.getElementById("modal");
      if (thisNode) {
        thisNode.classList.remove("modal");
      }
    }
  }, [isOpen]);
  return (
    <div
      id="modal"
      className="transform scale-0 fixed inset-0 w-screen h-screen bg-black flex justify-center items-center z-20 bg-opacity-50"
    >
      <button
        type="button"
        className="bg-white absolute top-3 right-10 p-4 px-8 bg-opacity-100 rounded-3xl"
        onClick={() => setIsOpen(false)}
      >
        x
      </button>
      <form className="bg-white rounded-2xl p-10 text-left w-1/3">
        <h3 className="mb-4 font-bold text-xl">로그인</h3>
        <input
          type="text"
          placeholder="아이디"
          className="mb-4 w-full placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 border-b block"
        />
        <input
          type="text"
          placeholder="비밀번호"
          className="mb-4 w-full placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 border-b block"
        />
        <button
          type="button"
          className="bg-green-300 w-full rounded-md py-3"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default React.memo(Modal);
