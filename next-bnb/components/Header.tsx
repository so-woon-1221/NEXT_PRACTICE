import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import AirbnbLogo from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logo_text.svg";
import useModal from "../hooks/useModal";
import { useSelector } from "../store";
import HamburgerIcon from "../public/static/svg/hamburger.svg";
import { authActions } from "../store/auth";
import AuthModal from "./auth/AuthModal";
import palette from "../styles/palette";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  .header-logo-wrapper + div {
    position: relative;
  }

  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }

  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &: hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;

const Header: React.FC = () => {
  const { openModal, ModalPortal, closeModal } = useModal();
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <AirbnbLogo className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      {!user.isLogged && (
        <div className="header-auth-buttons">
          <button
            type="button"
            className="header-sign-up-button"
            onClick={() => {
              dispatch(authActions.setAuthMode("signup"));
              openModal();
            }}
          >
            회원가입
          </button>
          <button
            type="button"
            className="header-login-button"
            onClick={() => {
              dispatch(authActions.setAuthMode("login"));
              openModal();
            }}
          >
            로그인
          </button>
        </div>
      )}
      {user.isLogged && (
        <OutsideClickHandler
          onOutsideClick={() => {
            if (isUserMenuOpened) {
              setIsUserMenuOpened(false);
            }
          }}
        >
          <button
            className="flex items-center h-12 pr-2 px border-0 rounded bg-white cursor-pointer outline-none hover:shadow-md"
            onClick={() => setIsUserMenuOpened(true)}
          >
            <HamburgerIcon />
            <img
              src="/static/svg/profile.svg"
              className="ml-2 w-8 h-8 rounded-md"
              alt=""
            />
          </button>
          {isUserMenuOpened && (
            <ul className="header-usermenu">
              <li>숙소관리</li>
              <Link href="/room/register/building">
                <a
                  role="presentation"
                  onClick={() => {
                    setIsUserMenuOpened(false);
                  }}
                >
                  <li>숙소등록하기</li>
                </a>
              </Link>
              <div className="header-usermenu-divider" />
              <li role="presentation" onClick={() => {}}>
                로그아웃
              </li>
            </ul>
          )}
        </OutsideClickHandler>
      )}
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
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
