import * as yup from "yup";

// schema
export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  msg: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

export const LoginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
