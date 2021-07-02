import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import CloseXIcon from "../../public/static/svg/close.svg";
import MailIcon from "../../public/static/svg/mail.svg";
import Button from "../common/Button";
import Input from "../common/input";
import palette from "../../styles/palette";
import { authActions } from "../../store/auth";
import { loginApi } from "../../lib/api/auth";
import useValidateMode from "../../hooks/useValidateMode";
import { userActions } from "../../store/user";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface Props {
  closeModal: () => void;
}

const LoginModal: React.FC<Props> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateMode(true);

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요");
    } else {
      const loginBody = { email, password };

      try {
        const { data } = await loginApi(loginBody);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmitLogin}>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일주소"
          name="email"
          type="email"
          icon={<MailIcon />}
          onChange={onChangeEmail}
          isValid={email !== ""}
        />
        <div className="login-input-wrapper login-password-input-wrapper">
          <Input
            placeholder="비밀번호"
            type="password"
            className="cursor-pointer"
            onChange={onChangePassword}
            isValid={email !== ""}
          />
        </div>
        <div className="login-modal-submit-button-wrapper">
          <Button type="submit">로그인</Button>
        </div>
        <p>
          회원가입하세요
          <span
            className="login-modal-set-signup"
            onClick={changeToSignUpModal}
            role="presentation"
          >
            회원가입
          </span>
        </p>
      </div>
    </Container>
  );
};

export default LoginModal;
