import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Account from "./manager/Account";
import SendAuthCode from "./auth/SendAuthCode";
import CreateAccount from "./auth/CreateAccount";
import ChangePassSuccess from "./auth/ChangePassSuccess";

import "boxicons/css/boxicons.min.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/send-auth-code", element: <SendAuthCode /> },
  { path: "/change-pass-success", element: <ChangePassSuccess /> },

  { path: "/account-manager", element: <Account /> },
]);

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
