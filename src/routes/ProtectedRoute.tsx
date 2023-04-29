import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  token: string | null;
  redirectPath: string;
  children: any;
}

export const ProtectedRoute: FC<Props> = ({ token, redirectPath = "/", children }) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
