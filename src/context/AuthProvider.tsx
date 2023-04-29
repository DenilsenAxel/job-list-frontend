import React from "react";
import { FC, useState } from "react";
import jwt_decode from "jwt-decode";
import { IAuthContext, IUserContext } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface Props {
  children: any;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  async function handleLogin(token: string) {
    const userObj: IUserContext = jwt_decode(token);

    setId(userObj.id);
    setToken(token);
    navigate("/");
  }

  function handleLogout() {
    setId("");
    setToken("");
    navigate("/auth");
  }

  const value = {
    id,
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
