import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { modalActions } from "../store/modal";

const useModal = () => {
  const { open } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(modalActions.setOpen(true));
    // setTimeout(() => dispatch(modalActions.setOpen(false)), 1000);
  };

  const closeModal = () => {
    dispatch(modalActions.setOpen(false));
  };

  interface Props {
    children: React.ReactNode;
  }

  const ModalPortal: React.FC<Props> = ({ children }) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.getElementById("modal-div");
        ref.current = dom;
      }
    }, []);

    useEffect(() => {
      console.log(open);
    }, [open]);

    if (ref.current && mounted && open) {
      return createPortal(
        <div className="w-full h-full flex items-center justify-center fixed inset-0 z-20">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            role="presentation"
            className="absolute w-full h-full bg-black bg-opacity-75"
            onClick={() => {
              closeModal();
            }}
          />
          {children}
        </div>,
        ref.current,
      );
    }
    return null;
  };

  return { openModal, closeModal, ModalPortal };
};

export default useModal;
