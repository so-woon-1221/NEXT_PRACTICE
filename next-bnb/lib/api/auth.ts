import axios from "axios";
// eslint-disable-next-line import/extensions,import/no-unresolved
import { UserType } from "../../types/user";

interface SignUpApiBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SignUpApiBody) =>
  axios.post<UserType>("/api/auth/signup", body);

export const loginApi = (body: { email: string; password: string }) =>
  axios.post<UserType>("/api/auth/login", body);

export const meAPI = () => axios.get<UserType>("/api/auth/me");

export const logoutAPI = () => axios.delete("/api/auth/logout");
