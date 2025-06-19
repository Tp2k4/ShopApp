import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../paths";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[]; // optional: danh sách role được phép
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Nếu không có token hoặc user thì về login
  if (!token || !user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // Nếu có truyền roles (ví dụ: ["ADMIN"]) và user không có quyền thì redirect
  if (roles && !roles.includes(user.role?.toUpperCase())) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
