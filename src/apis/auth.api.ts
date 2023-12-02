import { AxiosError } from "axios";

import { axiosIntance } from "./config.api";
import { LoginForm } from "../types/auth.type";

export const loginAPI = async (user: LoginForm) => {
  try {
    const response = await axiosIntance.post("auth/login", user);
    const token = response.headers["authorization"];
    localStorage.setItem("token", JSON.stringify(token));
    return {
      token: token,
      data: response.data,
    };
  } catch (error) {
    const errorAPI = error as AxiosError;
    throw errorAPI.response?.data;
  }
};
