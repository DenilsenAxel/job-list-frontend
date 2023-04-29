import axios from "axios";
import { IAuthRequest, IAuthResponse, IResponse } from "../interfaces";

export const login = async (auth: IAuthRequest, onLogin: (token: string) => void) => {
  try {
    const { data } = await axios.post<IResponse>(`${process.env.REACT_APP_API_PATH}/auth/login`, auth, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const payload = data.data as IAuthResponse;
    onLogin(payload.token!);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const register = async (auth: IAuthRequest, onLogin: (token: string) => void) => {
  try {
    const { data } = await axios.post<IResponse>(`${process.env.REACT_APP_API_PATH}/auth/register`, auth, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const payload = data.data as IAuthResponse;
    onLogin(payload.token!);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
