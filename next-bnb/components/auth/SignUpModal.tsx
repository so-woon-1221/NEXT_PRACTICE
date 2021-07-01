import React, { useState } from "react";
import CloseXIcon from "../../public/static/svg/close.svg";
import MailIcon from "../../public/static/svg/mail.svg";
import PersonIcon from "../../public/static/svg/person.svg";
import OpenedEye from "../../public/static/svg/open-eye.svg";
import ClosedEye from "../../public/static/svg/close-eye.svg";
import Input from "../common/input";
import Selector from "../common/Selector";
import { dayList, monthList, yearList } from "../../lib/staticData";
import Button from "../common/Button";

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangeLastname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastname(e.target.value);

  const onChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstname(e.target.value);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const [hidePassword, setHidePassword] = useState(true);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const onChangeBirthYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(e.target.value);
  };
  const onChangeBirthMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(e.target.value);
  };
  const onChangeBirthDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(e.target.value);
  };

  return (
    <div className="w-2/3 p-8 bg-white z-20">
      <CloseXIcon className="cursor-pointer block mb-8 ml-auto" />
      <div className="relative mb-4">
        <Input
          placeholder="이메일주소"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="relative mb-4">
        <Input
          placeholder="이름(예: 길동)"
          icon={<PersonIcon />}
          name="lastname"
          value={lastname}
          onChange={onChangeLastname}
        />
      </div>
      <div className="relative mb-4">
        <Input
          placeholder="성(예: 홍)"
          icon={<PersonIcon />}
          name="firstname"
          value={firstname}
          onChange={onChangeFirstname}
        />
      </div>
      <div className="relative mb-4">
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
        />
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
          />
        </div>
        <div className="mr-4 w-1/4">
          <Selector
            options={dayList}
            onChange={onChangeBirthDay}
            value={birthDay}
          />
        </div>
        <div className="w-1/3">
          <Selector
            options={yearList}
            onChange={onChangeBirthMonth}
            value={birthMonth}
          />
        </div>
      </div>
      <div className="mb-4 pb-4 border-b border-b-gray-500">
        <Button type="submit">가입하기</Button>
      </div>
    </div>
  );
};

export default SignUpModal;
