import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/close.svg";
import MailIcon from "../../public/static/svg/mail.svg";
import PersonIcon from "../../public/static/svg/person.svg";
import OpenedEye from "../../public/static/svg/open-eye.svg";
import ClosedEye from "../../public/static/svg/close-eye.svg";
import Input from "../common/input";
import Selector from "../common/Selector";
import { dayList, monthList, yearList } from "../../lib/staticData";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { userActions } from "../../store/user";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 20;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
`;

const PASSWORD_MIN_LENGTH = 8;

interface Props {
  closeModal: () => void;
}

const SignUpModal: React.FC<Props> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  // const [validateMode, setValidateMode] = useState(true);
  const { setValidateMode } = useValidateMode();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangeLastname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastname(e.target.value);

  const onChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstname(e.target.value);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const [hidePassword, setHidePassword] = useState(true);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const dispatch = useDispatch();

  const onChangeBirthYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(e.target.value);
  };
  const onChangeBirthMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(e.target.value);
  };
  const onChangeBirthDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(e.target.value);
  };

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastname ||
      password.includes(lastname) ||
      password.includes(email.split("@")[0]),
    [password, lastname, email],
  );

  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password],
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !/[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
      /[0-9]/g.test(password),
    [password],
  );

  const validateSignUpForm = () => {
    if (!email || !lastname || !firstname || !password) {
      return false;
    }
    if (
      isPasswordHasNumberOrSymbol ||
      !isPasswordOverMinLength ||
      isPasswordHasNameOrEmail
    ) {
      return false;
    }
    if (!birthDay || !birthYear || !birthMonth) {
      return false;
    }
    return true;
  };

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastname,
          firstname,
          password,
          birthday: new Date("2021-10-20").toISOString(),
        };
        const { data } = await signupAPI(signUpBody);

        console.log("gi");

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
  });

  return (
    <Container onSubmit={onSubmitSignUp}>
      <Head>
        <title>회원가입</title>
      </Head>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          placeholder="이메일주소"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름(예: 길동)"
          icon={<PersonIcon />}
          name="lastname"
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage="이름을 입력하세여."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성(예: 홍)"
          icon={<PersonIcon />}
          name="firstname"
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage="성을 입력하세요."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <OpenedEye
                className="register-password-svg"
                onClick={toggleHidePassword}
              />
            ) : (
              <ClosedEye
                className="register-password-svg"
                onClick={toggleHidePassword}
              />
            )
          }
          name="password"
          value={password}
          onChange={onChangePassword}
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            !isPasswordHasNumberOrSymbol &&
            isPasswordOverMinLength
          }
          errorMessage="비밀번호를 입력하세요."
          onFocus={onFocusPassword}
        />
        {passwordFocused && (
          <>
            <PasswordWarning
              isValid={isPasswordHasNameOrEmail}
              text="비밀번호에 본인이름이나 이메일을 포함할 수 없습니다."
            />
            <PasswordWarning
              isValid={!isPasswordOverMinLength}
              text="최소 8자"
            />
            <PasswordWarning
              isValid={!isPasswordHasNumberOrSymbol}
              text="숫자나 기호를 포함하세요."
            />
          </>
        )}
      </div>
      <p className="font-semibold mt-4 mb-2">생일</p>
      <p className="mb-4 text-gray-600">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 사용자에게 공개되지 않습니다.
      </p>
      <div className="flex mb-5">
        <div className="mr-4 flex-grow">
          <Selector
            options={monthList}
            onChange={onChangeBirthMonth}
            value={birthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="mr-4 w-1/4">
          <Selector
            options={dayList}
            onChange={onChangeBirthDay}
            value={birthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="w-1/3">
          <Selector
            options={yearList}
            onChange={onChangeBirthYear}
            value={birthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <div className="mb-4 pb-4 border-b border-b-gray-500">
        <Button type="submit">가입하기</Button>
      </div>
      <p>
        이미 에어비엔비 계정이 있나요?
        <span
          className="text-indigo-600 ml-2 cursor-pointer"
          role="presentation"
          onClick={() => {}}
        >
          로그인
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
