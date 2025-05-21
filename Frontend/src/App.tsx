import {
  Login,
  ForgotPassword,
  ResetPassword,
  SendAuthCode,
  CreateAccount,
  ChangePassSuccess,
} from "./auth";
import {
  Home,
  Account,
  Product,
  Sale,
  Inventory,
  Statistics,
} from "./manager/pages";
import { Order, OrderConfirmation } from "./employee/pages";
import { autoLogin } from "./service/authService";
import { ROUTES } from "./shared/paths";
import BuyHistory from "./user/BuyHistory";

import "boxicons/css/boxicons.min.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from "./user/UserProfile";

const router = createBrowserRouter([
  { path: ROUTES.AUTH.LOGIN, element: <Login /> },
  { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.AUTH.RESET_PASSWORD, element: <ResetPassword /> },
  { path: ROUTES.AUTH.CREATE_ACCOUNT, element: <CreateAccount /> },
  { path: ROUTES.AUTH.SEND_AUTH_CODE, element: <SendAuthCode /> },
  { path: ROUTES.AUTH.CHANGE_PASS_SUCCESS, element: <ChangePassSuccess /> },

  { path: ROUTES.MANAGER.HOME, element: <Home /> },
  { path: ROUTES.MANAGER.ACCOUNT, element: <Account /> },
  { path: ROUTES.MANAGER.PRODUCT, element: <Product /> },
  { path: ROUTES.MANAGER.SALE, element: <Sale /> },
  { path: ROUTES.MANAGER.INVENTORY, element: <Inventory /> },
  { path: ROUTES.MANAGER.STATISTICS, element: <Statistics /> },

  { path: ROUTES.EMPLOYEE.ORDER, element: <Order /> },
  { path: ROUTES.EMPLOYEE.ORDER_CONFIRMATION, element: <OrderConfirmation /> },

  { path: ROUTES.USER.BUY_HISTORY, element: <BuyHistory /> },
  { path: ROUTES.USER.USER_PROFILE, element: <UserProfile /> },
]);

const App: React.FC = () => {
  autoLogin();

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
